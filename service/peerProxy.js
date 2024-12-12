const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = new Map();

  wss.on('connection', (ws) => {
    const connectionId = uuid.v4();
    connections.set(connectionId, ws);

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
        console.log('Received WebSocket message:', message);

        switch(message.type) {
          case 'move':
            const { gameId, player, boardIndex, row, col } = message;
            
            // Broadcast to all connections
            connections.forEach((connection) => {
              connection.send(JSON.stringify({
                type: 'move',
                gameId,
                player,
                boardIndex,
                row,
                col,
                timestamp: new Date().toISOString()
              }));
            });
            break;

          case 'newGame':
            console.log('New game created:', message);
            break;

          case 'joinGame':
            console.log('Game joined:', message);
            // Broadcast the join to all connections
            connections.forEach((connection) => {
              connection.send(JSON.stringify({
                type: 'joinGame',
                gameId: message.gameId,
                player: message.player,
                timestamp: new Date().toISOString()
              }));
            });
            break;

          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      connections.delete(connectionId);
    });
  });

  setInterval(() => {
    connections.forEach((ws) => {
      ws.ping();
    });
  }, 30000);
}

module.exports = { peerProxy };
