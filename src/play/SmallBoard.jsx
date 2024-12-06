import React, { useState } from 'react';
import Cell from './Cell';

const SmallBoard = ({ index, winner, currentPlayer, isActive, onMove }) => {
  const [cells, setCells] = useState(Array(9).fill(null));

  const checkWinner = (cells) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  const handleCellClick = (cellIndex) => {
    if (cells[cellIndex] || winner || !isActive) return;

    const newCells = [...cells];
    newCells[cellIndex] = currentPlayer;
    setCells(newCells);

    const boardWinner = checkWinner(newCells);
    onMove(index, cellIndex, boardWinner);
  };

  return (
    <div className={`small-board ${isActive ? 'active' : ''}`}>
      {cells.map((cell, cellIndex) => (
        <Cell
          key={cellIndex}
          value={cell}
          onClick={() => handleCellClick(cellIndex)}
        />
      ))}
    </div>
  );
};

export default SmallBoard;
