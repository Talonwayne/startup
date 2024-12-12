import React, { useState, useEffect } from 'react';
import { UltimateTicTacToe } from './UltimateTicTacToe';
import { GameNotifier } from './gameNotifier';

export function Play(props) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const ws = new WebSocket('ws://localhost:4000/ws'); 

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch('/api/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }

    fetchGames();
  }, []);

  const handleCreateGame = async () => {
    const newGame = { player1: props.userName };
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error creating game:', errorBody);
        throw new Error(`Error: ${errorBody.msg || 'Failed to create game'}`);
      }

      const game = await response.json();
      setGames([...games, game]);
      setSelectedGame(game.id);
      ws.send(JSON.stringify({ type: 'newGame', gameId: game.id, player: props.userName }));
    } catch (error) {
      console.error('Failed to create game:', error.message);
    }
  };

  const handleJoinGame = async (gameId) => {
    const player2 = props.userName;
    try {
      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, player2 }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error joining game:', errorBody);
        throw new Error(`Error: ${errorBody.msg || 'Failed to join game'}`);
      }

      const updatedGame = await response.json();
      setSelectedGame(updatedGame.id);
    } catch (error) {
      console.error('Failed to join game:', error.message);
    }
  };

  const handleGameEnd = async (result) => {
    setGameResult(result);
    setSelectedGame(null);
    // Update Elo ratings
    const winner = result.winner; // Assuming result contains winner info
    const loser = result.loser; // Assuming result contains loser info
    await fetch('/api/games/updateElo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winner, loser }),
    });
  };

  const handleMove = (row, col) => {
    if (selectedGame) {
      ws.send(JSON.stringify({ type: 'move', gameId: selectedGame, player: props.userName, row, col }));
    }
  };

  return (
    <main className="bg-secondary" style={{ marginTop: '20px', padding: '20px' }}>
      {!selectedGame ? (
        <>
          <h1>Available Games</h1>
          {gameResult && (
            <div className="game-result">
              <h2>Game Over</h2>
              <p>{gameResult}</p>
            </div>
          )}
          <button onClick={handleCreateGame} className="create-game-button">
            Create New Game
          </button>
          <ul className="game-list">
            {games.map((game) => (
              <li key={game.id}>
                <button onClick={() => handleJoinGame(game.id)} className="game-button">
                  Join {game.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1>{selectedGame}</h1>
          <UltimateTicTacToe onGameEnd={handleGameEnd} ws={ws} onMove={handleMove} />
        </>
      )}
    </main>
  );
}