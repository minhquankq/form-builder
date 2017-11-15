import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

// import ExampleFormBuilder from './containers/ExampleFormBuilder';
import ExampleTableComponent from './containers/ExampleTableComponent';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Core app</h1>
          </header>
        </div>
        <div className="form-builder">
          {/* <ExampleFormBuilder /> */}
          <ExampleTableComponent />
        </div>
      </div>
    );
  }
}

export default App;
