import React from 'react';
import FreeGameContainer from '../../components/game/free-game-container';
import GameContainer from '../../components/game/game-container';

import { useGlobalState } from '../../state';

export default function Game() {
  const [loggedIn] = useGlobalState('loggedIn');

  return <>{loggedIn ? <GameContainer /> : <FreeGameContainer />}</>;
}
