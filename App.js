import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import store from './redux/store';
import {connectToServer} from './utils/socketio';
import Messages from './components/Message/Messages';

const App = () => {
  return <Provider store={store}>{<Messages />}</Provider>;
};

const styles = StyleSheet.create({});

export default App;
