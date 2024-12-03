import React from 'react';
import './about.css';

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    setImageUrl(`Sketch.png`);
    setQuote('Show me the code');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="container mt-4">
        <h1>How to Play</h1>
        <p>Ultimate Tic Tac Toe is a game where two players dynamically play 9 games of Tic Tac Toe at the same time. These smaller games come together to form one big game of Tic Tac Toe. If one player wins a smaller game of Tic Tac Toe, their symbol takes over that grid in the larger game. Whoever wins the large game of Tic Tac Toe wins the match.</p>
        <p>The smaller games of Tic Tac Toe are evaluated like normal games. If one player moves in the top corner of a smaller game, the other player must play in the corresponding top corner of the next game, if possible. The game includes a server that sends data to players logged in on the website. The history of games played is stored and used to calculate player scores, similar to the Elo rating system.</p>

        <img src="Sketch.png" alt="Example of an Ultimate Tic Tac Toe game" className="img-fluid" />
        <p className="text-center">Example of an Ultimate Tic Tac Toe game</p>

        <h2>Quote of the Day</h2>
      </div>

      <div>
        <div className='quote-box bg-light text-dark'>
          <h1>Tic Tac Toe Tornado</h1>
            <p className='quote'>
            I’m ready for
            Tic Tac Toe
            Cause I got
            my own rhymes to show
            Watch me shine
            My X’s are always in a row
            Can you feel the room react
            as it feels my glow
            The Tickity Tac Tac
            Clackity Clack Clack
            Ricky Rhyme Time Show
            </p>
          <p className='author'>Richard Lamoureux</p>
        </div>
      </div>
    </main>
  );
}
