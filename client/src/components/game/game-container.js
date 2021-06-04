import React from 'react';

import { useGlobalState } from '../../state';

export default function GameContainer() {
  const [currentUser] = useGlobalState('currentUser');
  return (
    <>
      <h2>My Celiac Adventure</h2>
      {<h3>Welcome {currentUser.username}!</h3>}
    </>
  );
}
