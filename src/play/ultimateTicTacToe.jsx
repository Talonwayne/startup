import React, { useState } from 'react';
import BigBoard from './BigBoard';

export function UltimateTicTacToe(){
  const [bigBoardState, setBigBoardState] = useState(Array(9).fill(null)); // Winner of each small board
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Current player
  const [activeSmallBoard, setActiveSmallBoard] = useState(null); // Active board to play in

  const handleMove = (smallBoardIndex, cellIndex, winner) => {
    if (winner) {
      const newBigBoardState = [...bigBoardState];
      newBigBoardState[smallBoardIndex] = winner;
      setBigBoardState(newBigBoardState);
    }

    setActiveSmallBoard(cellIndex); // Update active board
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Switch player
  };

  return (
    <div>
      <BigBoard
        bigBoardState={bigBoardState}
        currentPlayer={currentPlayer}
        activeSmallBoard={activeSmallBoard}
        onMove={handleMove}
      />
    </div>
  );
};
