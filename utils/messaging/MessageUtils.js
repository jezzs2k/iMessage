import PropTypes from 'prop-types';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';

export const MessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'image', 'location']),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
});

export function getId() {
  return uuidv4();
}

export function CreateTextMessage(text) {
  return {
    type: 'text',
    id: getId(),
    text,
    createAt: new Date(),
  };
}

export function CreateImageMessage(uri) {
  return {
    type: 'image',
    id: getId(),
    uri,
    createAt: new Date(),
  };
}

export function createLocationMessage(coordinate) {
  return {
    type: 'location',
    id: getId(),
    coordinate,
    createAt: new Date(),
  };
}
