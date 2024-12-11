import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/api/scores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <div>Loading scores...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="container">
        <h1>Best Players</h1>
        <p className="text-center mb-4">Highest Elo</p>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Elo</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={score._id}>
                  <td>{index + 1}</td>
                  <td>{score.username || 'Anonymous'}</td>
                  <td>{score.elo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3'>Be the first to score</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
