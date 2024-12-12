const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Username Already Taken' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password, 400);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Wrong Username or Password' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies['token'];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getBestElos();
  res.send(scores);
});

secureApiRouter.post('/score', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Fetch available games
secureApiRouter.get('/games', async (req, res) => {
  const games = await DB.getAvailableGames(); 
  res.send(games);
});

// Create a new game
secureApiRouter.post('/games', async (req, res) => {
  if (await DB.getGame(req.body.gameName)) {
    res.status(409).send({ msg: 'That Name is Already Taken' });
  }
  
  const authToken = req.cookies['token'];

  if (!authToken) {
    return res.status(401).send({ msg: 'Unauthorized: No token provided' });
  }

  const user = await DB.getUserByToken(authToken);

  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized: Invalid token' });
  }

  try {
    const newGame = await DB.createGame(user.username);
    res.send(newGame);
  } catch (error) {
    console.error('Error creating game in database:', error);
    res.status(500).send({ msg: 'Failed to create game' });
  }
});

// Join a game
secureApiRouter.post('/games/join', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = await DB.getUserByToken(authToken);
  const { gameId } = req.body;
  try {
    const updatedGame = await DB.joinGame(gameId, user.username);
    res.send(updatedGame);
  } catch (error) {
    console.error('Error joining game in database:', error);
    res.status(500).send({ msg: 'Failed to join game' });
  }
});

// Update Elo ratings
secureApiRouter.post('/games/updateElo', async (req, res) => {
  const { winner, loser } = req.body; // Assuming winner and loser are usernames
  const result = await DB.updateElos(false, winner, loser); // Implement this function
  res.send(result);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
