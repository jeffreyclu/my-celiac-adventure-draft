import React from 'react';
import { Redirect, Route } from 'react-router';

import { useGlobalState } from '../../state';

export default function Authorized({ location, ...props }) {
  const [loggedIn] = useGlobalState('loggedIn');

  return (
    <>
      {loggedIn ? (
        <Route {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </>
  );
}
