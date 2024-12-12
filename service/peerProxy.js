const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js'); // Import the database module

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    ws.on('message', async (data) => {
      const message = JSON.parse(data);
      if (message.type === 'move') {
        // Handle player move
        const { gameId, player, row, col } = message;
        const updatedGame = await DB.makeMove(gameId, player, row, col);
        // Broadcast the updated game state to all players
        connections.forEach((c) => {
          if (c.ws !== ws) {
            c.ws.send(JSON.stringify({ type: 'update', game: updatedGame }));
          }
        });
      } else if (message.type === 'gameEnd') {
        const { winner, loser } = message;
        await DB.updateElos(false, winner, loser); // Update Elo ratings
        // Notify players about the game end
        connections.forEach((c) => {
          c.ws.send(JSON.stringify({ type: 'gameEnd', winner, loser }));
        });
      }
    });

    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
