import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import routes from './routes';
import reducers from './reducers';
const token = localStorage.getItem('token');
const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);
persistStore(store);
if (token) {
  store.dispatch({ type: 'AUTH_USER' });
  browserHistory.push('/dashboard');
}
//App entry point
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('app')
);
