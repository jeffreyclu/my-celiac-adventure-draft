import React from 'react';
import { Link } from 'react-router-dom';
import NavLogout from './nav-logout';

import styles from './nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <NavLogout />
    </nav>
  );
}
