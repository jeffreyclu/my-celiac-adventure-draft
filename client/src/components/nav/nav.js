import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalState } from '../../state';
import NavLogout from './nav-logout';

import styles from './nav.module.css';

export default function Nav() {
  const [loggedIn] = useGlobalState('loggedIn');
  if (loggedIn) {
    return (
      <nav className={styles.nav}>
        <Link to="/">Play</Link>
        <Link to="/profile">Profile</Link>
        <NavLogout />
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <Link to="/">Play</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
