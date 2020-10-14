import Constants from 'expo-constants';
import React, {useEffect, useState, useMemo} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === 'ios' ? Constants.statusHeight : 0;

const Status = () => {
  const [info, setInfo] = useState(null);
  const height = 10;

  const yTranslateMemo = useMemo(() => {
    const yTranslate = new Animated.Value(0);
    return yTranslate;
  }, []);

  let negativeHeight = -height + 20;
  let modalMoveY = yTranslateMemo.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  });

  let translateStyle = {transform: [{translateY: modalMoveY}]};

  const isConnected = info !== 'none';
  const backgroundColor = isConnected ? 'white' : 'red';

  useEffect(() => {
    if (!isConnected) {
      yTranslateMemo.setValue(0);
      Animated.spring(yTranslateMemo, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [isConnected, yTranslateMemo]);

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (info !== state.type && state.type !== 'unknown') {
      setInfo(state.type);
    }

    if (state.type === 'unknown' && info !== 'none') {
      setInfo('none');
    }
  });

  useEffect(() => {
    if (info === 'none') {
      unsubscribe();
    }
  }, [info, unsubscribe]);

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer}>
      {statusBar}
      <View style={styles.messageItem}>
        {!isConnected && (
          <Animated.View style={[styles.bubble, translateStyle]}>
            <Text style={styles.text}>No network connection</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, backgroundColor]}>{messageContainer}</View>
    );
  }

  return info && messageContainer;
};

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  messageItem: {
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  bubble: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 18,
    height: 40,
    paddingHorizontal: 16,
  },
});

export default Status;
