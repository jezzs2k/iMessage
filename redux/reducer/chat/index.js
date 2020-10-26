import {combineReducers} from 'redux';
import message from './message';
import send from './send';

export default combineReducers({message, send});
