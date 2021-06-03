import React from 'react';
import { Redirect, Route } from 'react-router';

import { useGlobalState } from '../../state';

export default function AdminAuthorized({ location, ...props }) {
  const [loggedIn] = useGlobalState('loggedIn');
  const [isAdmin] = useGlobalState('isAdmin');

  return (
    <>
      {loggedIn && isAdmin ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/admin-login', state: { from: location } }}
        />
      )}
    </>
  );
}
