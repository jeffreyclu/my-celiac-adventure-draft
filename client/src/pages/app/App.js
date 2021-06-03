import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddFood from '../add-food/add-food';
import Game from '../game/game';
import Login from '../login/login';
import Register from '../register/register';
import { useGlobalState } from '../../state';
import {
  isAuthorized,
  isAdminAuthorized,
} from '../../components/auth/utils/index';

import styles from './app.module.css';
import AdminAuthorized from '../../components/auth/auth-admin';
import AdminLogin from '../login/admin-login';

export default function App() {
  const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');
  const [, setIsAdmin] = useGlobalState('isAdmin');
  const [, setCurrentUser] = useGlobalState('currentUser');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getLoginStatus = async () => {
      const authStatus = await isAuthorized();
      if (authStatus.success) {
        setLoggedIn(true);
        setCurrentUser(authStatus.data);
      }
      const adminStatus = await isAdminAuthorized();
      if (adminStatus.success) {
        setIsAdmin(true);
      }
      setLoaded(true);
    };

    getLoginStatus();
  }, [loggedIn, setLoggedIn, setCurrentUser, setIsAdmin]);

  return (
    <div className={styles.app}>
      {loaded && (
        <>
          <Router>
            <Switch>
              <AdminAuthorized path="/add-food" component={AddFood} />
              <Route path="/admin-login" component={AdminLogin} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Game} />
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}
