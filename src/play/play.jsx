import React from 'react';

import { Players } from './players';
import { SimonGame } from './simonGame';

export function Play(props) {
  return (
    <main className='bg-secondary' style={{ marginTop: '200px' }}>
      <Players userName={props.userName} />
      <SimonGame userName={props.userName} />
    </main>
  );
}
