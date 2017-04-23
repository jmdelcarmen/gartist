import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Components
import requireAuth from './components/auth/require_auth';
import App from './components/app';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import SetlistForm from './components/create_setlist/setlist_form';
import SetlistSongs from './components/create_setlist/setlist_songs';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Auth} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />
    <Route path="/setlists/create" component={SetlistForm} />
    <Route path="/setlists/:id" component={SetlistSongs} />
  </Route>
)
