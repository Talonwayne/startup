import React, { useState } from 'react';
import './UltimateTicTacToe.css';

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

export function UltimateTicTacToe({ onGameEnd }) {
  const [boards, setBoards] = useState(
    Array(9).fill().map(() => ({
      cells: Array(3).fill(null).map(() => Array(3).fill(null)),
      winner: null,
    }))
  );
  const [nextPlayer, setNextPlayer] = useState('x');
  const [targetBoard, setTargetBoard] = useState(null);
  const [gameOver, setGameOver] = useState(null);

  const handleMove = (boardIndex, row, col) => {
    if (gameOver) return;

    const newBoards = boards.map((board, index) => {
      if (index !== boardIndex) return board;

      const newCells = board.cells.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? nextPlayer : cell))
      );

      return {
        ...board,
        cells: newCells,
        winner: calculateWinner(newCells) || (newCells.flat().every((cell) => cell) ? 'N' : null),
      };
    });

    const largeBoardWinner = calculateLargeBoardWinner(newBoards);

    if (largeBoardWinner) {
      const result = `Player ${largeBoardWinner.toUpperCase()} wins the game!`;
      setGameOver(result);
      if (onGameEnd) onGameEnd(result);
      return;
    }

    const isLargeBoardTie = newBoards.every((board) => board.winner);
    if (isLargeBoardTie) {
      const result = 'The game is a tie!';
      setGameOver(result);
      if (onGameEnd) onGameEnd(result);
      return;
    }

    setBoards(newBoards);
    setNextPlayer(nextPlayer === 'x' ? 'o' : 'x');

    const nextBoardIndex = row * 3 + col;
    const targetIsUnavailable =
      newBoards[nextBoardIndex]?.winner || newBoards[nextBoardIndex]?.cells.flat().every((cell) => cell);

    setTargetBoard(targetIsUnavailable ? null : nextBoardIndex);
  };

  const calculateWinner = (cells) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        cells[Math.floor(a / 3)][a % 3] &&
        cells[Math.floor(a / 3)][a % 3] === cells[Math.floor(b / 3)][b % 3] &&
        cells[Math.floor(a / 3)][a % 3] === cells[Math.floor(c / 3)][c % 3]
      ) {
        return cells[Math.floor(a / 3)][a % 3];
      }
    }
    return null;
  };

  const calculateLargeBoardWinner = (boards) => {
    const winners = boards.map((board) => board.winner || null);
    const largeBoard = [
      winners.slice(0, 3),
      winners.slice(3, 6),
      winners.slice(6, 9),
    ];
    return calculateWinner(largeBoard);
  };

  return (
    <div className="ultimate-board">
      {boards.map((board, index) => (
        <SmallBoard
          key={index}
          board={board.cells}
          winner={board.winner}
          isActive={!gameOver && (targetBoard === null || targetBoard === index)}
          onMove={(row, col) => handleMove(index, row, col)}
        />
      ))}
    </div>
  );
}
