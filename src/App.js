import "./App.css";

import React, { Component } from "react";
import Login from "./components/Authentication/Login/Login";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import Home from "./components/Home/Home";
// import Navigation from './components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/account">
            <Account />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
