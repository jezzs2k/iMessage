import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import user from './reducer/user';
import chat from './reducer/chat';

const appReducer = combineReducers({user, chat});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createStore(rootReducer, {}, applyMiddleware(thunk));
