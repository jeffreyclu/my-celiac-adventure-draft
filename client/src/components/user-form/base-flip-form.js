import React from 'react';

import { useLocation, Link } from 'react-router-dom';

export default function BaseFlipForm() {
  const { pathname } = useLocation();
  return (
    <>
      {/login/.test(pathname) ? (
        <Link to="/register">Register Instead</Link>
      ) : (
        <Link to="/login">Login Instead</Link>
      )}
    </>
  );
}
