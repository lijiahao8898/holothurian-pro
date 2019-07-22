import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

// components
import Login from '@/pages/login/login';
import Home from '@/pages/home/index';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login}/>
            <Redirect exact from="/" to="/login"/>
            <Route path="/index" component={Home}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
