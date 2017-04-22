import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import setlists from './setlists';

const rootReducer = combineReducers({
  auth, user, setlists
});

export default rootReducer;
