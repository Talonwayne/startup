import React from 'react';
import SmallBoard from './SmallBoard';

const BigBoard = ({ bigBoardState, currentPlayer, activeSmallBoard, onMove }) => {
  const renderSmallBoard = (index) => {
    return (
      <SmallBoard
        key={index}
        index={index}
        winner={bigBoardState[index]}
        currentPlayer={currentPlayer}
        isActive={activeSmallBoard === null || activeSmallBoard === index}
        onMove={onMove}
      />
    );
  };

  return (
    <div className="big-board">
      {[...Array(9)].map((_, index) => renderSmallBoard(index))}
    </div>
  );
};

export default BigBoard;
