import { useState } from "react";

function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button 
      className={`square ${isHighlighted ? 'highlighted' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function SubBoard({ board, mainRow, mainCol, onPlay, isPlayable, currentTarget }) {
  const renderSquare = (subRow, subCol) => {
    const isHighlighted = currentTarget && 
      mainRow === currentTarget[0] && 
      mainCol === currentTarget[1];

    return (
      <Square
        value={board[subRow][subCol]}
        isHighlighted={isHighlighted}
        onSquareClick={() => isPlayable && onPlay(mainRow, mainCol, subRow, subCol)}
      />
    );
  };

  return (
    <div className="sub-board">
      <div className="board-row">
        {renderSquare(0, 0)}
        {renderSquare(0, 1)}
        {renderSquare(0, 2)}
      </div>
      <div className="board-row">
        {renderSquare(1, 0)}
        {renderSquare(1, 1)}
        {renderSquare(1, 2)}
      </div>
      <div className="board-row">
        {renderSquare(2, 0)}
        {renderSquare(2, 1)}
        {renderSquare(2, 2)}
      </div>
    </div>
  );
}

function Board({ xIsUp, board, mainBoard, onPlay, targetBoard }) {
  const isSubBoardPlayable = (row, col) => {
    return !targetBoard || (targetBoard[0] === row && targetBoard[1] === col);
  };

  return (
    <div className="main-board">
      {[0, 1, 2].map(row => (
        <div key={row} className="main-board-row">
          {[0, 1, 2].map(col => (
            <div key={col} className={`sub-board-wrapper ${mainBoard[row][col] ? 'won-' + mainBoard[row][col] : ''}`}>
              <SubBoard
                board={board[row][col]}
                mainRow={row}
                mainCol={col}
                onPlay={onPlay}
                isPlayable={isSubBoardPlayable(row, col) && mainBoard[row][col] === " "}
                currentTarget={targetBoard}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const createEmptyBoard = () => Array(3).fill(null)
    .map(() => Array(3).fill(null)
      .map(() => Array(3).fill(null)
        .map(() => Array(3).fill(null))));

  const createEmptyMainBoard = () => Array(3).fill(null)
    .map(() => Array(3).fill(" "));

  const [board, setBoard] = useState(createEmptyBoard());
  const [mainBoard, setMainBoard] = useState(createEmptyMainBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [targetBoard, setTargetBoard] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  function calculateWinner(board) {
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]
    ];

    for (const line of lines) {
      const [[a1, a2], [b1, b2], [c1, c2]] = line;
      if (board[a1][a2] !== " " && 
          board[a1][a2] !== "D" &&
          board[a1][a2] === board[b1][b2] && 
          board[a1][a2] === board[c1][c2]) {
        return board[a1][a2];
      }
    }
    return null;
  }

  function isBoardFull(board) {
    return board.every(row => 
      row.every(cell => cell !== null && cell !== " ")
    );
  }

  function handlePlay(mainRow, mainCol, subRow, subCol) {
    const newBoard = JSON.parse(JSON.stringify(board));
    const currentPlayer = xIsNext ? "X" : "O";

    // Make the move
    newBoard[mainRow][mainCol][subRow][subCol] = currentPlayer;
    
    // Check if sub-board is won or drawn
    const subBoardArray = board[mainRow][mainCol].map(row => row.slice());
    if (calculateWinner(subBoardArray)) {
      mainBoard[mainRow][mainCol] = currentPlayer;
    } else if (isBoardFull(subBoardArray)) {
      mainBoard[mainRow][mainCol] = "D";
    }

    // Check if game is won
    const winner = calculateWinner(mainBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
      resetGame();
      return;
    }

    // Set next target board
    const nextTarget = mainBoard[subRow][subCol] === " " ? [subRow, subCol] : null;
    
    setBoard(newBoard);
    setTargetBoard(nextTarget);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(createEmptyBoard());
    setMainBoard(createEmptyMainBoard());
    setXIsNext(true);
    setTargetBoard(null);
  }

  return (
    <div className="game">
      <div className="score-board">
        <div>X Score: {scores.X}</div>
        <div>O Score: {scores.O}</div>
      </div>
      <div className="game-board">
        <Board
          xIsUp={xIsNext}
          board={board}
          mainBoard={mainBoard}
          onPlay={handlePlay}
          targetBoard={targetBoard}
        />
      </div>
      <div className="game-info">
        <div>Current Player: {xIsNext ? 'X' : 'O'}</div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}
