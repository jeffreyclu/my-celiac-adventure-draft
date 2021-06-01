import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddFood from '../add-food/add-food';
import Game from '../game/game';

import styles from './app.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route path="/add-food">
            <AddFood />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
