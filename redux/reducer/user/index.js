import {combineReducers} from 'redux';
import auth from './auth';
import demo from './demo';

export default combineReducers({auth, demo});
