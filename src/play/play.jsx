import React from 'react';

import { Players } from './players';
import { UltimateTicTacToe } from './ultimateTicTacToe';

export function Play(props) {
  return (
    <main className='bg-secondary' style={{ marginTop: '200px' }}>
      <Players userName={props.userName} />
      <UltimateTicTacToe userName={props.userName} />
    </main>
  );
}
