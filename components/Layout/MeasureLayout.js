import React, {useState} from 'react';
import {Constants} from 'expo';
import {Platform, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const MeasureLayout = ({children}) => {
  const [layout, setLayout] = useState(null);

  const handleLayout = (event) => {
    const {
      nativeEvent: {layout},
    } = event;
    setLayout({
      ...layout,
      y: layout.y + (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
    });
  };

  if (!layout) {
    return <View onLayout={handleLayout} style={styles.container} />;
  }

  return children(layout);
};

MeasureLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
