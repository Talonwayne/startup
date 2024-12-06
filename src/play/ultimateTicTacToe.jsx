import React, { useState } from 'react';
import './ultimateTicTacToe.css';

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


export function UltimateTicTacToe() {
  const [boards, setBoards] = useState(Array(9).fill().map(() => ({
    cells: Array(3).fill(null).map(() => Array(3).fill(null)),
    winner: null,
  })));
  const [nextPlayer, setNextPlayer] = useState('x');
  const [targetBoard, setTargetBoard] = useState(null);

  const handleMove = (boardIndex, row, col) => {
    const newBoards = boards.map((board, index) => {
      if (index !== boardIndex) return board;

      // Update the board state
      const newCells = board.cells.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? nextPlayer : cell))
      );

      return {
        ...board,
        cells: newCells,
        winner: calculateWinner(newCells) || (newCells.flat().every(cell => cell) ? 'N' : null),
      };
    });

    setBoards(newBoards);
    setNextPlayer(nextPlayer === 'x' ? 'o' : 'x');

    // Set the next target board
    const nextBoardIndex = row * 3 + col;
    const targetIsUnavailable =
      newBoards[nextBoardIndex]?.winner || newBoards[nextBoardIndex]?.cells.flat().every(cell => cell);

    setTargetBoard(targetIsUnavailable ? null : nextBoardIndex);
  };

  const calculateWinner = (cells) => {
    const lines = [
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
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (cells[Math.floor(a / 3)][a % 3] &&
          cells[Math.floor(a / 3)][a % 3] === cells[Math.floor(b / 3)][b % 3] &&
          cells[Math.floor(a / 3)][a % 3] === cells[Math.floor(c / 3)][c % 3]) {
        return cells[Math.floor(a / 3)][a % 3];
      }
    }
    return null;
  };

  return (
    <div className="ultimate-board">
      {boards.map((board, index) => (
        <SmallBoard
          key={index}
          board={board.cells}
          winner={board.winner}
          isActive={targetBoard === null || targetBoard === index}
          onMove={(row, col) => handleMove(index, row, col)}
        />
      ))}
    </div>
  );
}