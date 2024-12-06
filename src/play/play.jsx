import React, { useState, useEffect } from 'react';
import { UltimateTicTacToe } from './UltimateTicTacToe';

export function Play(props) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);

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

  const handleGameEnd = (result) => {
    setGameResult(result);
    setSelectedGame(null);
  };

  const handleCreateGame = () => {
    const newGame = { name: `Game ${games.length + 1}` };
    setGames([...games, newGame]);
    setSelectedGame(newGame.name);
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
            {games.map((game, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedGame(game.name)}
                  className="game-button"
                >
                  Play {game.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1>{selectedGame}</h1>
          <UltimateTicTacToe onGameEnd={handleGameEnd} />
        </>
      )}
    </main>
  );
}