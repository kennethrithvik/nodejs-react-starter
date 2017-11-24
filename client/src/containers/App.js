import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/common/NotFound'
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {

  render() {
    let msg =()=> (<div><p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <RaisedButton label="Hello" /></div>);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Switch>
          <Route exact path="/" component={msg} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
