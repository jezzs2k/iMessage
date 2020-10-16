import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
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

const MessageList = ({messages, onPressMessage}) => {
  const keyExtractor = (item) => item.id.toString();

  const renderMessageBody = (item, condition, handlePresMessage) => {
    const {type, text, uri, coordinate} = item;
    switch (type) {
      case 'text':
        return (
          <TouchableOpacity
            onPress={handlePresMessage}
            activeOpacity={0.8}
            onLongPress={() => toggleModalText(item)}>
            <View
              style={[
                styles.messageBubble,
                condition === 2
                  ? styles.messageBubbleReceiver
                  : styles.messageBubblesender,
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
            <Image style={styles.image} source={{uri}} />
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
                ...coordinate,
                latitudeDelta: 0.08,
                longitudeDelta: 0.04,
              }}>
              <MapView.Marker coordinate={coordinate} />
            </MapView>
          </TouchableOpacity>
        );
      default:
        return <View />;
    }
  };

  const renderMessageItem = ({item, index}) => {
    const handlePresMessage = () => {
      onPressMessage(item);
    };

    return (
      <View
        style={[
          styles.messageRow,
          index === 2 ? styles.messageRowReceiver : styles.messageRowSender,
        ]}>
        {renderMessageBody(item, index, handlePresMessage)}
      </View>
    );
  };

  const [modalText, toggleModalText] = useActionModal({
    type: 'text',
    isDark: true,
  });

  const [modalImage, toggleModalImage] = useActionModal({
    type: 'image',
    isDark: true,
  });

  const [modalLocation, toggleModalLocation] = useActionModal({
    type: 'location',
    isDark: true,
  });

  return (
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
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
  },
  containerText: {
    position: 'relative',
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
