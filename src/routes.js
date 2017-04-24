import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Components
import requireAuth from './components/auth/require_auth';
import App from './components/app';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import SetlistForm from './components/setlist/setlist_form';
import SetlistSongsEdit from './components/setlist/setlist_songs_edit';
import SetlistSongsView from './components/setlist/setlist_songs_view';
// <Route path="/setlists/:id/view" component={SetlistView} />
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Auth} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />
    <Route path="/setlists/create" component={SetlistForm} />
    <Route path="/setlists/:id/edit" component={SetlistSongsEdit} />
    <Route path="/setlists/:id/view" component={SetlistSongsView} />
  </Route>
)
