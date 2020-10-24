import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import MessageList from './components/Message/MessageList';
import Status from './components/Status';
import {
  CreateImageMessage,
  createLocationMessage,
  CreateTextMessage,
} from './utils/messaging/MessageUtils';
import {useConfirmModal} from './components/Modal/useConfirmModal';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';
import {CusomImagePicker} from './components/CustomImagePicker';

const App = () => {
  const [fullScreenImageUri, setImageUri] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isChooseMedia, setChooseMedia] = useState(false);

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

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {
        console.log(files);
      },
      (error) => {
        console.log(error);
      },
    );
    return () => ReceiveSharingIntent.clearReceivedFiles();
  }, []);

  const handlePressToolbarCamera = () => {
    setChooseMedia(!isChooseMedia);
  };

  const handlePressToolbarLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(({longitude, latitude}) => {
        setMessages((messages) => [
          createLocationMessage({latitude, longitude}),
          ...messages,
        ]);
      })
      .catch((error) => {
        console.warn('error', error);
      });
  };

  const handleChangeFocus = (isFocused) => {
    setInputFocused(isFocused);
    setChooseMedia(false);
  };

  const handleSubmit = (text) => {
    setMessages((messages) => [CreateTextMessage(text), ...messages]);
  };

  const handlePickerImage = (uri) => {
    setMessages((messages) => [CreateImageMessage(uri), ...messages]);
  };

  const [messages, setMessages] = useState([
    CreateImageMessage('https://unsplash.it/300/300'),
    CreateTextMessage(
      'TEX, viết không định dạng là TeX, là một hệ thống sắp chữ được viết bởi Donald Knuth và giới thiệu lần đầu vào năm 1978.',
    ),
    CreateTextMessage(
      'LaTeX is not a stand-alone typesetting program in itself, but document preparation software that runs on top of Donald E. Knuth s TeX typesetting system. TeX distributions usually bundle together all the parts needed for a working TeX system and they generally add to this both configuration and maintenance utilities. Nowadays LaTeX, and many of the packages built on it, form an important component of any major TeX distribution.',
    ),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);

  const handlePressMessage = ({uri, type}) => {
    switch (type) {
      case 'image':
        setImageUri(uri);
        setInputFocused(false);
        setChooseMedia(false);
        break;
      default:
        break;
    }
  };

  const dismissFullScreenImage = () => {
    setImageUri(null);
  };

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={handleSubmit}
          onChangeFocus={handleChangeFocus}
          onPressCamera={handlePressToolbarCamera}
          onPressLocation={handlePressToolbarLocation}
        />
      </View>
    );
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

  const renderInputEditer = () => {
    return (
      <View style={styles.inputMethodEditer}>
        {CusomImagePicker({
          onPressTakePhoto: handlePickerImage,
          setChooseMedia: setChooseMedia,
        })}
        <ImageGrid onPressImage={handlePickerImage} />
      </View>
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

  const handleRemoveMessage = (item) => {
    setMessages((mes) => mes.filter((i) => i.id !== item.id));
  };

  return (
    <>
      {modal}
      <Status />
      <MessageList
        messages={messages}
        onPressMessage={handlePressMessage}
        pressRemoveMessage={handleRemoveMessage}
      />
      {renderToolbar()}
      {renderFullScreenImage()}
      {isChooseMedia && renderInputEditer()}
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
  toolbar: {},
  inputMethodEditer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default App;
