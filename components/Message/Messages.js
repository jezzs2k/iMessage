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
import {useDispatch, useSelector} from 'react-redux';

import MessageList from '../Message/MessageList';
import Status from '../Status';
import {
  CreateImageMessage,
  createLocationMessage,
} from '../../utils/messaging/MessageUtils';
import {useConfirmModal} from '../Modal/useConfirmModal';
import Toolbar from '../Toolbar';
import ImageGrid from '../ImageGrid';
import {CusomImagePicker} from '../CustomImagePicker';
import {reset, retrive} from '../../redux/action/chat/message';
import {retrived as sendRetrived} from '../../redux/action/chat/send';
import {
  createNewRoom,
  sendMess,
  realTimeReveiverMess,
} from '../../utils/socketio';

let conversationId = 'vuthanhhieu';

const Messages = () => {
  const [fullScreenImageUri, setImageUri] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isChooseMedia, setChooseMedia] = useState(false);
  const [messages, setMessages] = useState([]);

  const loadingMess = useSelector((state) => state.chat.message.loading);
  const retrivedSendMess = useSelector((state) => state.chat.send.retrived);
  const retrivedMess = useSelector((state) => state.chat.message.retrived);
  const user = useSelector((state) => state?.user?.demo?.retrived);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('create new room');
    createNewRoom(conversationId);
  }, []);

  useEffect(() => {
    if (user && Object.entries(user).length > 0) {
      dispatch(retrive(user?._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    retrivedMess && setMessages(retrivedMess?.messages);
  }, [retrivedMess]);

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

  // useEffect(() => {
  //   ReceiveSharingIntent.getReceivedFiles(
  //     (files) => {
  //       console.log(files);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //   );
  //   return () => ReceiveSharingIntent.clearReceivedFiles();
  // }, []);

  useEffect(() => {
    if (retrivedSendMess) {
      console.log('send Success');
    }
  }, [retrivedSendMess, dispatch]);

  useEffect(() => {
    realTimeReveiverMess(() => dispatch(retrive()));
  }, [dispatch]);

  const handlePressToolbarCamera = () => {
    setChooseMedia(!isChooseMedia);
  };

  const handlePressToolbarLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(({longitude, latitude}) => {
        console.log(longitude, latitude);
        // setMessages((messages) => [
        //   createLocationMessage({latitude, longitude}),
        //   ...messages,
        // ]);
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
    const value = {
      receiverUser: '5f94109b21402f00445f72e9',
      message: {
        text: text,
        senderUser: user?._id,
      },
      conversationId: '5f9622cec31e8b0917009e2a',
    };

    dispatch(sendRetrived(value));
    value.conversationId = conversationId;
    sendMess(value);
  };

  const handlePickerImage = (uri) => {
    // setMessages((messages) => [CreateImageMessage(uri), ...messages]);
  };

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

  const handleRemoveMessage = (item) => {
    setMessages((mes) => mes.filter((i) => i._id !== item._id));
  };

  return (
    <>
      <Status />
      <MessageList
        user={user}
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

export default Messages;
