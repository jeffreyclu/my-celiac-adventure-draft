import React from 'react';
import { useGlobalState } from '../../state';

export default function Game() {
  const [loggedIn] = useGlobalState('loggedIn');
  const [currentUser] = useGlobalState('currentUser');
  return (
    <>
      <h2>My Celiac Adventure</h2>
      {loggedIn && <h3>Welcome {currentUser.username}</h3>}
    </>
  );
}
