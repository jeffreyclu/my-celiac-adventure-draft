import React from 'react';
import { Redirect, Route } from 'react-router';

import { useGlobalState } from '../../state';

export default function Unauthorized({ location, ...props }) {
  const [loggedIn] = useGlobalState('loggedIn');

  return (
    <>
      {loggedIn ? (
        <Redirect to={{ pathname: '/', state: { from: location } }} />
      ) : (
        <Route {...props} />
      )}
    </>
  );
}
