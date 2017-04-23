import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import setlist from './setlist';

export default combineReducers({ auth, user, setlist });
