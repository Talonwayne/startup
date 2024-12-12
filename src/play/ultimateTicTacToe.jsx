import React, { useState, useEffect } from 'react';
import './UltimateTicTacToe.css';
import { GameEvent, GameNotifier } from './gameNotifier';

function SmallBoard({ board, onMove, isActive, winner }) {
  const handleCellClick = (row, col) => {
    if (isActive && !board[row][col] && !winner) {
      onMove(row, col);
    }
  };

  const isTie = !winner && board.flat().every((cell) => cell);

  return (
    <div className={`small-board ${isActive ? 'active' : ''} ${winner ? 'winner' : ''}`}>
      {winner || isTie ? (
        <div className="board-winner">
          {winner ? winner.toUpperCase() : 'N'}
        </div>
      ) : (
        board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? 'taken' : ''} ${cell === 'x' ? 'x' : cell === 'o' ? 'o' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )
      )}
    </div>
  );
}

export function UltimateTicTacToe({ onGameEnd, myTeam, ws, selectedGame }) {
  const [boards, setBoards] = useState(
    Array(9).fill().map(() => ({
      cells: Array(3).fill(null).map(() => Array(3).fill(null)),
      winner: null,
    }))
  );
  const [nextPlayer, setNextPlayer] = useState('x');
  const [targetBoard, setTargetBoard] = useState(null);
  const [gameOver, setGameOver] = useState(null);
  const [players, setPlayers] = useState([]);

  // Function to calculate the next target board
  const calculateNextTargetBoard = (row, col) => {
    // The next board is determined by the last move's position
    const nextBoardIndex = row * 3 + col;
    
    // If the next board is already won or full, allow play on any open board
    return boards[nextBoardIndex].winner ? null : nextBoardIndex;
  };

  // Helper function to check winner in a small board
  const checkSmallBoardWinner = (board) => {
    const winningCombos = [
      // Rows
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      // Columns
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      // Diagonals
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        board[a[0]][a[1]] && 
        board[a[0]][a[1]] === board[b[0]][b[1]] && 
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }
    return null;
  };

  // Helper function to check if the board is full
  const isBoardFull = (board) => {
    return board.every(row => row.every(cell => cell !== null));
  };

  const updateElo = async (winner) => {
    // If it's a draw, we don't want to update Elo
    if (winner === 'draw') return;

    // Determine winner and loser usernames
    const winnerUsername = players.find(player => player.includes(winner));
    const loserUsername = players.find(player => !player.includes(winner));

    if (!winnerUsername || !loserUsername) {
      console.error('Could not determine usernames for Elo update');
      return;
    }

    try {
      await fetch('/api/games/updateElo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          winner: winnerUsername, 
          loser: loserUsername 
        }),
      });
    } catch (error) {
      console.error('Error updating Elo:', error);
    }
  };

  const handleGameEnd = (winner) => {
    setGameOver(winner);
    if (onGameEnd) onGameEnd(winner);
    updateElo(winner);
  };

  // Check for winner after each move
  useEffect(() => {
    const newBoards = boards.map((board, index) => {
      if (board.winner) return board;

      const winner = checkSmallBoardWinner(board.cells);
      
      if (winner) {
        return { ...board, winner };
      }

      if (isBoardFull(board.cells)) {
        return { ...board, winner: 'draw' };
      }

      return board;
    });

    const ultimateBoardWinner = checkUltimateBoardWinner(newBoards);
    
    if (ultimateBoardWinner) {
      handleGameEnd(ultimateBoardWinner);
    }

    if (JSON.stringify(newBoards) !== JSON.stringify(boards)) {
      setBoards(newBoards);
    }
  }, [boards]);

  // Helper function to check winner in the ultimate board
  const checkUltimateBoardWinner = (boardStates) => {
    const winningCombos = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      const winnersToCheck = [
        boardStates[a].winner, 
        boardStates[b].winner, 
        boardStates[c].winner
      ];

      // Check if all three are the same non-null, non-draw winner
      if (
        winnersToCheck[0] && 
        winnersToCheck[0] !== 'draw' &&
        winnersToCheck[0] === winnersToCheck[1] && 
        winnersToCheck[0] === winnersToCheck[2]
      ) {
        return winnersToCheck[0];
      }
    }
    return null;
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data);

        switch(data.type) {
          case 'joinGame':
            setPlayers(prevPlayers => {
              if (!prevPlayers.includes(data.player)) {
                return [...prevPlayers, data.player];
              }
              return prevPlayers;
            });
            break;

          case 'move':
            const { player, boardIndex, row, col } = data;
            
            // Create a deep copy of the boards
            const newBoards = JSON.parse(JSON.stringify(boards));
            
            // Update the specific cell
            newBoards[boardIndex].cells[row][col] = player;
            
            // Calculate and set the next target board
            const nextTarget = calculateNextTargetBoard(row, col);
            
            // Update boards and switch player
            setBoards(newBoards);
            setNextPlayer(player === 'x' ? 'o' : 'x');
            setTargetBoard(nextTarget);
            break;
        }
      };
    }

    return () => {
      if (ws) {
        ws.onmessage = null;
      }
    };
  }, [ws, boards]);

  const handleMove = (boardIndex, row, col) => {
    // Check if the move is valid
    if (
      gameOver || 
      nextPlayer !== myTeam || 
      boards[boardIndex].cells[row][col] ||
      (targetBoard !== null && boardIndex !== targetBoard)
    ) return;

    // Prepare move data
    const moveData = {
      type: 'move',
      gameId: selectedGame,
      player: myTeam,
      boardIndex,
      row,
      col,
    };

    // Send move to server
    if (ws) {
      ws.send(JSON.stringify(moveData));
    }

    // Optimistically update local state
    const newBoards = JSON.parse(JSON.stringify(boards));
    newBoards[boardIndex].cells[row][col] = myTeam;
    
    // Calculate next target board
    const nextTarget = calculateNextTargetBoard(row, col);
    
    setBoards(newBoards);
    setNextPlayer(myTeam === 'x' ? 'o' : 'x');
    setTargetBoard(nextTarget);
  };

  return (
    <div className="ultimate-tic-tac-toe-container">
      {gameOver && (
        <div className="game-winner">
          <div className="winner-content">
            {gameOver === 'draw' ? (
              <h2>It's a Draw!</h2>
            ) : (
              <>
                <h2>Game Over!</h2>
                <p>Winner: Player {gameOver.toUpperCase()}</p>
                <p>Winning Players: {players.filter(player => player.includes(gameOver)).join(', ')}</p>
              </>
            )}
            <button 
              onClick={() => {
                // Reset game or navigate back to game list
                // You might want to implement a specific reset logic
                window.location.href = '/play';
              }}
            >
              Return to Game List
            </button>
          </div>
        </div>
      )}
      <div className="game-header">
        <div className="players-info">
          <h3>Players:</h3>
          {players.map((player, index) => (
            <span key={index} className={`player ${index === 0 ? 'x-player' : 'o-player'}`}>
              {player}
            </span>
          ))}
        </div>
        <div className="next-player-info">
          <h3>Next Player:</h3>
          <span className={`next-player ${nextPlayer}`}>
            {nextPlayer.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="ultimate-board">
        {boards.map((board, index) => (
          <SmallBoard
            key={index}
            board={board.cells}
            winner={board.winner}
            isActive={
              !gameOver && 
              (targetBoard === null || targetBoard === index)
            }
            onMove={(row, col) => handleMove(index, row, col)}
          />
        ))}
      </div>
    </div>
  );
}
