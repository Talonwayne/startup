import React from 'react';

import { UltimateTicTacToe } from './UltimateTicTacToe';

export function Play(props) {
  console.log("Play component rendered with props:", props);
  return (
    <main className='bg-secondary' style={{ marginTop: '20px' }}>
      <UltimateTicTacToe />
    </main>
  );
}
