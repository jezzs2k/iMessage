import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MessageList from './components/Message/MessageList';
import Status from './components/Status';
import {
  CreateImageMessage,
  createLocationMessage,
  CreateTextMessage,
} from './utils/messaging/MessageUtils';
import {useConfirmModal} from './components/Modal/useConfirmModal';
import {useModalDropList} from './components/Modal/useModalDropList';

const App = () => {
  const [fullScreenImageUri, setImageUri] = useState(null);

  useEffect(() => {
    const subcribe = BackHandler.addEventListener('hardwareBackPress', () => {
      if (fullScreenImageUri !== null) {
        setImageUri(null);
        return true;
      }
      return false;
    });

    return () => subcribe.remove();
  }, [fullScreenImageUri]);

  const [messages, setMessages] = useState([
    CreateImageMessage('https://unsplash.it/300/300'),
    CreateTextMessage('World'),
    CreateTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);

  const handlePressMessage = ({uri, type}) => {
    switch (type) {
      case 'image':
        setImageUri(uri);
        break;
      default:
        break;
    }
  };

  const dismissFullScreenImage = () => {
    setImageUri(null);
  };

  const renderFullScreenImage = () => {
    return (
      fullScreenImageUri && (
        <View style={styles.fullScreenOverlay}>
          <Image
            style={styles.fullscreenImage}
            source={{uri: fullScreenImageUri}}
          />
          <TouchableOpacity
            onPress={dismissFullScreenImage}
            style={styles.closeButton}>
            <MaterialIcons name="close" size={50} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )
    );
  };

  const [modal, toggleModal] = useConfirmModal({
    title: 'Are you sure you want to delete your custom workout?',
    onTopPress: () => {
      console.log('Hieu Confirm');
    },
    onBottomPress: () => {},
    isDark: false,
  });

  return (
    <>
      {modal}
      <Status />
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
      {renderFullScreenImage()}
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
