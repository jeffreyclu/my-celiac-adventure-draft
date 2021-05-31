import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';

import Food from '../food/Food';
// import * as styles from './App.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/food'>
            <Food />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
