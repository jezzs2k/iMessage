import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

import {MessageShape} from '../../utils/messaging/MessageUtils';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  responsiveFontSize,
} from '../../utils';
import {useActionModal} from '../Modal/useActionModal';

const MessageList = ({messages, onPressMessage, pressRemoveMessage, user}) => {
  const keyExtractor = (item) => item._id;

  const renderMessageBody = (item, condition, handlePresMessage) => {
    let type = null;

    const {media, text, location} = item?.message;

    if (media) {
      if (media['@type'] === 'jpg' || media['@type'] === 'png') {
        type = 'image';
      } else {
        type = 'location';
      }
    } else {
      type = 'text';
    }

    switch (type) {
      case 'text':
        return (
          <TouchableOpacity
            onPress={handlePresMessage}
            activeOpacity={0.8}
            onLongPress={() => toggleModalText(item)}>
            {item?.replyMessId?.message && (
              <View style={[styles.messageBubble, styles.messageReply]}>
                <Text style={styles.text}>
                  {item?.replyMessId?.message?.text}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                condition
                  ? styles.messageBubblesender
                  : styles.messageBubbleReceiver,
              ]}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
      case 'image':
        return (
          <TouchableOpacity
            onPress={handlePresMessage}
            activeOpacity={0.8}
            onLongPress={() => toggleModalImage(item)}>
            <Image style={styles.image} source={{uri: media?.url}} />
          </TouchableOpacity>
        );
      case 'location':
        return (
          <TouchableOpacity
            onPress={handlePresMessage}
            activeOpacity={0.8}
            onLongPress={() => toggleModalLocation(item)}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...location,
                latitudeDelta: 0.08,
                longitudeDelta: 0.04,
              }}>
              <MapView.Marker coordinate={location} />
            </MapView>
          </TouchableOpacity>
        );
      default:
        return <View />;
    }
  };

  const renderMessageItem = ({item, index}) => {
    const isCurrentUser = item?.message?.senderUser?._id === user._id;
    const handlePresMessage = () => {
      onPressMessage(item);
    };

    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.messageRowSender : styles.messageRowReceiver,
        ]}>
        {renderMessageBody(item, isCurrentUser, handlePresMessage)}
      </View>
    );
  };

  const [modalText, toggleModalText] = useActionModal({
    type: 'text',
    isDark: true,
    pressRemoveMessage,
  });

  const [modalImage, toggleModalImage] = useActionModal({
    type: 'image',
    isDark: true,
    pressRemoveMessage,
  });

  const [modalLocation, toggleModalLocation] = useActionModal({
    type: 'location',
    isDark: true,
    pressRemoveMessage,
  });

  return (
    messages.length > -1 && (
      <>
        {modalText}
        {modalLocation}
        {modalImage}
        <FlatList
          style={styles.container}
          inverted
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps={'handled'}
        />
      </>
    )
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
  pressRemoveMessage: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    height: 500,
  },
  containerText: {
    position: 'relative',
    height: 500,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: heightPercentageToDP(1.2),
    marginRight: widthPercentageToDP(3),
    marginLeft: widthPercentageToDP(3),
  },
  messageRowReceiver: {
    justifyContent: 'flex-start',
  },
  messageRowSender: {
    justifyContent: 'flex-end',
  },
  messageBubbleReceiver: {
    backgroundColor: '#bdc3c7',
  },
  messageBubblesender: {
    backgroundColor: 'rgb(16,135,255)',
  },
  messageBubble: {
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 20,
    maxWidth: 300,
  },
  messageReply: {
    backgroundColor: '#1e272e',
    borderRadius: 20,
    top: 8,
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: 'white',
  },
  image: {
    width: widthPercentageToDP(40),
    height: widthPercentageToDP(40),
    borderRadius: 10,
  },
  map: {
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(60),
    borderRadius: 10,
  },
});

export default MessageList;
