import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import store from './redux/store';
import Demo from './components/Demo';

const App = () => {
  return (
    <Provider store={store}>
      <Demo />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
