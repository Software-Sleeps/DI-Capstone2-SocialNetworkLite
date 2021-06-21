import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import CreateUser from './components/CreateUser/CreateUser';

class App extends Component {
  render() {
    return (
      <div>
      <CreateUser/>
      </div>
    );
  }
}

export default App;
