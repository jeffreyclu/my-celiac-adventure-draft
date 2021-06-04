import React from 'react';

import { useGlobalState } from '../../state';

export default function UserDetails() {
  const [currentUser] = useGlobalState('currentUser');
  const { username, email } = currentUser;
  return (
    <>
      <article>
        <p>{username}</p>
        <p>{email}</p>
      </article>
    </>
  );
}
