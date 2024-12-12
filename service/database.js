const { MongoClient, ObjectId } = require('mongodb');
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

function getGame(gameName) {
  return gameCollection.findOne({ gameName: gameName });
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

async function createGame(gameName, player1) {
  if (!gameName) {
    throw new Error('Game name is required');
  }

  const newGame = {
    gameName: gameName,
    players: [player1],
    moves: [], 
    status: 'waiting', 
    winner: null,
  };
  const result = await gameCollection.insertOne(newGame);
  return { 
    id: result.insertedId,
    gameName: gameName,
    players: [player1],
    status: 'waiting'
  };
}

async function getAvailableGames() {
  try {
    const games = await gameCollection
      .find({ status: 'waiting' })
      .toArray();

    return games.map(game => ({
      id: game._id.toString(),
      gameName: game.gameName,
      players: game.players,
      status: game.status
    }));
  } catch (error) {
    console.error('Error in getAvailableGames:', error);
    throw error;
  }
}

async function joinGame(gameId, player2) {
  try {
    console.log('Attempting to join game:', { gameId, player2 });

    if (!ObjectId.isValid(gameId)) {
      console.log('Invalid gameId format:', gameId);
      throw new Error('Invalid game ID format');
    }

    // First, verify the game exists and is waiting
    const game = await gameCollection.findOne({ 
      _id: new ObjectId(gameId), 
      status: 'waiting' 
    });

    console.log('Found game:', game);

    if (!game) {
      console.log('Game not found or not in waiting status');
      throw new Error('Game not found or already started');
    }

    // Then update it
    const result = await gameCollection.updateOne(
      { _id: new ObjectId(gameId) },
      { 
        $addToSet: { players: player2 }, 
        $set: { status: 'active' } 
      }
    );

    console.log('Update result:', result);

    if (result.modifiedCount === 0) {
      console.log('No document was updated');
      throw new Error('Failed to update game');
    }

    // Fetch the updated game to return
    const updatedGame = await gameCollection.findOne({ 
      _id: new ObjectId(gameId) 
    });

    console.log('Updated game:', updatedGame);

    return {
      id: updatedGame._id.toString(),
      gameName: updatedGame.gameName,
      players: updatedGame.players,
      status: updatedGame.status
    };

  } catch (error) {
    console.error('Detailed error in joinGame:', error);
    throw error;
  }
}

async function makeMove(gameId, player, row, col) {
  const game = await gameCollection.findOne({ _id: gameId });
  if (!game || game.status !== 'active') {
    throw new Error('Game is not active or does not exist');
  }

  const move = { player, row, col };
  const updatedMoves = [...game.moves, move];

  await gameCollection.updateOne(
    { _id: gameId },
    { $set: { moves: updatedMoves } }
  );

  return { ...game, moves: updatedMoves }; 
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
  getGame,
};
