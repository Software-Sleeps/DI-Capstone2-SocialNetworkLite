import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import Login from './components/Login/Login';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Account from './components/Account/Account';
import Navigation from './components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div>

        <Navigation/>

        <Switch>

      <Route exact path="/login">
        <Login/>
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/account">
        <Account/>
      </Route>

      </Switch>
      </div>
    );
  }
}

export default App;
