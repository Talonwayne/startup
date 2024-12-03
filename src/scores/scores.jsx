import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-secondary text-center'>

      <div className="container">
        <h1>High Scores</h1>
        <p className="text-center mb-4">Placeholder for database (will add later)</p>
        <ol className="score-list">
          <li className="score-item">1st Place</li>
          <li className="score-item">2nd Place</li>
          <li className="score-item">3rd Place</li>
          <li className="score-item">4th Place</li>
          <li className="score-item">5th Place</li>
        </ol>
      </div>
    </main>
  );
}
