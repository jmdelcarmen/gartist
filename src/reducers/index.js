import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import setlist from './setlist';

const rootReducer = combineReducers({
  auth, user, setlist
});

export default rootReducer;
