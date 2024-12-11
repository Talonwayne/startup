const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const gameCollection = db.collection('games');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password, elo) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    elo: elo,
  };
  await userCollection.insertOne(user);
  return user;
}

async function createGame(player1) {
  const newGame = {
    players: [player1],
    moves: [], // Store moves made in the game
    status: 'waiting', // Game status: waiting, active, finished
    winner: null,
  };
  const result = await gameCollection.insertOne(newGame);
  return { id: result.insertedId, ...newGame };
}

async function getAvailableGames() {
  return gameCollection.find({ status: 'waiting' }).toArray(); // Return only waiting games
}

async function joinGame(gameId, player2) {
  const updatedGame = await gameCollection.findOneAndUpdate(
    { _id: gameId, status: 'waiting' },
    { $addToSet: { players: player2 }, $set: { status: 'active' } }, // Add player2 and change status to active
    { returnDocument: 'after' }
  );
  return updatedGame.value; // Return the updated game
}

async function makeMove(gameId, player, row, col) {
  const game = await gameCollection.findOne({ _id: gameId });
  if (!game || game.status !== 'active') {
    throw new Error('Game is not active or does not exist');
  }

  // Update the moves array with the new move
  const move = { player, row, col };
  const updatedMoves = [...game.moves, move];

  // Here you would also need to check for a winner and update the game status accordingly
  // For simplicity, let's assume we just update the moves for now
  await gameCollection.updateOne(
    { _id: gameId },
    { $set: { moves: updatedMoves } }
  );

  return { ...game, moves: updatedMoves }; // Return the updated game state
}

async function updateGame(gameId, updatedGame) {
  return gameCollection.updateOne(
    { _id: gameId },
    { $set: updatedGame }
  );
}

function getBestElos() {
  const options = {
    sort: { elo: -1 },
    limit: 5,
    projection: { username: 1, elo: 1 }
  };
  const cursor = userCollection.find({}, options);
  return cursor.toArray();
}

async function updateElos(isDraw, winnerUsername, loserUsername) {
  const K = 30;
  const winner = await userCollection.findOne({ username: winnerUsername });
  const loser = await userCollection.findOne({ username: loserUsername });

  if (!winner || !loser) {
    throw new Error('Winner or loser not found');
  }

  const expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400));

  const winnerUpdate = isDraw ? 1 : K * (1 - expectedWinner); 
  const loserUpdate = isDraw ? 1 : K * (0 - expectedLoser); 

  const winnerUpdateResult = await userCollection.updateOne(
    { username: winner.username },
    { $inc: { elo: winnerUpdate } }
  );

  const loserUpdateResult = await userCollection.updateOne(
    { username: loser.username },
    { $inc: { elo: loserUpdate } }
  );

  return {
    winnerUpdated: winnerUpdateResult.modifiedCount > 0,
    loserUpdated: loserUpdateResult.modifiedCount > 0,
  };
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createGame,
  updateGame,
  updateElos,
  getBestElos,
  getAvailableGames,
  joinGame,
  makeMove,
};
