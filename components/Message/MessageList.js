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

const MessageList = ({messages, onPressMessage}) => {
  const keyExtractor = (item) => item.id.toString();
  const renderMessageBody = ({type, text, uri, coordinate}) => {
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
        <TouchableOpacity onPress={handlePresMessage}>
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
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60,
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default MessageList;
