import React from 'react';
import { useHistory } from 'react-router';

import { useGlobalState } from '../../state';

export default function NavLogout() {
  const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');
  const [currentUser, setCurrentUser] = useGlobalState('currentUser');
  const history = useHistory();
  const handleLogout = async () => {
    if (!loggedIn) {
      return; // TODO handle already logged in error
    }
    const req = await fetch('/api/logout', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    });
    console.log('here');
    if (!req.ok) {
      return; // TODO handle logout error message
    }
    const resp = await req.json();
    if (!resp) {
      return; // TODO handle logout error message
    }
    const { success, message } = resp;
    if (!success) {
      console.log(message);
      return; // TODO handle logout error message
    }
    setCurrentUser({});
    setLoggedIn(false);
    return history.push('/');
  };
  return <button onClick={handleLogout}>Logout</button>;
}
