import React, { useState, useEffect } from 'react';
import { UltimateTicTacToe } from './UltimateTicTacToe';

export function Play(props) {
  const [games, setGames] = useState([]);
  const [gameName, setGameName] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [myTeam, setMyTeam] = useState('x');
  const [ws, setWs] = useState(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:4000/ws');
    websocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data);

        // Handle different types of messages
        switch(data.type) {
          case 'gameUpdate':
            // If the updated game matches the currently selected game
            if (data.game.gameName === selectedGame) {
              console.log('Game updated:', data.game);
              
              // Update the games list to reflect the latest game state
              setGames(prevGames => 
                prevGames.map(game => 
                  game.id === data.game.id ? data.game : game
                )
              );

              // If the game status changes (e.g., from 'waiting' to 'active')
              if (data.game.status === 'active') {
                // Ensure the game remains selected
                setSelectedGame(data.game.gameName);
              }
            }
            break;

          case 'newGame':
            // Add the new game to the list of available games
            setGames(prevGames => {
              // Check if the game already exists to prevent duplicates
              const gameExists = prevGames.some(game => game.gameName === data.gameName);
              return gameExists 
                ? prevGames 
                : [...prevGames, { 
                    gameName: data.gameName, 
                    players: [data.player], 
                    status: 'waiting' 
                  }];
            });
            break;

          case 'joinGame':
            // Update the specific game's player list when someone joins
            setGames(prevGames => 
              prevGames.map(game => 
                game.gameName === data.gameName 
                  ? { ...game, players: [...game.players, data.player] } 
                  : game
              )
            );
            break;
        }
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

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
    if (!gameName) {
      console.error('Game name is required');
      return;
    }

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName, player1: props.userName }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error creating game:', errorBody);
        throw new Error(`Error: ${errorBody.msg || 'Failed to create game'}`);
      }

      const game = await response.json();
      setGames([...games, game]);
      setSelectedGame(game.gameName);
      setMyTeam('x');
      
      if (ws) {
        ws.send(JSON.stringify({ 
          type: 'newGame', 
          gameName: game.gameName, 
          player: props.userName 
        }));
      }
    } catch (error) {
      console.error('Failed to create game:', error.message);
    }
  };

  const handleJoinGame = async (gameId) => {
    try {
      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error joining game:', errorBody);
        throw new Error(`Error: ${errorBody.msg || 'Failed to join game'}`);
      }

      const updatedGame = await response.json();
      console.log('Joined game:', updatedGame);
      
      setMyTeam('o');
      setSelectedGame(updatedGame.gameName);
      
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === gameId ? updatedGame : game
        )
      );

      if (ws) {
        ws.send(JSON.stringify({ 
          type: 'joinGame', 
          gameId: gameId, 
          player: props.userName 
        }));
      }
    } catch (error) {
      console.error('Failed to join game:', error.message);
    }
  };

  const handleGameEnd = async (result) => {
    setGameResult(result);
    setSelectedGame(null);
    const winner = result.winner;
    const loser = result.loser;
    await fetch('/api/games/updateElo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winner, loser }),
    });
  };

  const handleMove = (row, col) => {
    if (selectedGame && ws) {
      ws.send(JSON.stringify({ 
        type: 'move', 
        gameId: selectedGame, 
        player: props.userName, 
        row, 
        col 
      }));
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
          <ul className="game-list">
            {games.map((game) => (
              <li key={game.id}>
                <button onClick={() => handleJoinGame(game.id)} className="game-button">
                  Join {game.gameName}
                </button>
              </li>
            ))}
          </ul>
          <div className="create-game-section">
            <input
              type="text"
              placeholder="Enter Game Name"
              className="game-name-input"
              onChange={(event) => setGameName(event.target.value)}
            />
            <button onClick={handleCreateGame} className="create-game-button">
              Create New Game
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>{selectedGame}</h1>
          {ws && <UltimateTicTacToe 
            onGameEnd={handleGameEnd} 
            ws={ws} 
            onMove={handleMove} 
            myTeam={myTeam}
          />}
        </>
      )}
    </main>
  );
}