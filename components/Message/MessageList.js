import React from 'react';
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

const MessageList = ({messages, onPressMessage, onLongPressEachMessage}) => {
  const keyExtractor = (item) => item.id.toString();
  const renderMessageBody = (item) => {
    const {type, text, uri, coordinate} = item;

    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case 'image':
        return <Image style={styles.image} source={{uri}} />;
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}>
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return <View />;
    }
  };

  const renderMessageItem = ({item}) => {
    const handlePresMessage = () => {
      onPressMessage(item);
    };

    return (
      <View style={styles.messageRow}>
        <TouchableOpacity
          onPress={handlePresMessage}
          activeOpacity={0.8}
          onLongPress={() => {
            console.log('vu thanhe Hie');
          }}>
          {renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      inverted
      data={messages}
      renderItem={renderMessageItem}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps={'handled'}
    />
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible', // Prevents clipping on resize!
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP(1.2),
    marginRight: widthPercentageToDP(3),
    marginLeft: widthPercentageToDP(9),
  },
  messageBubble: {
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(3),
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
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
