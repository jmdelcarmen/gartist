import React from 'react';
import { Route } from 'react-router';

//Components
import App from './components/app';
import Login from './components/auth/login';
// import Dashboard from './components/dashboard';
// <Route path="dashboard" component={Dasboard} />
export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
  </Route>
)
