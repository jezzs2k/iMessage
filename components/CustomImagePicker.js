import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PropTypes from 'prop-types';

export const CusomImagePicker = ({
  onPressTakePhoto,
  setChooseMedia,
  itemMargin = StyleSheet.hairlineWidth,
  numColumns = 4,
}) => {
  const {width} = Dimensions.get('window');
  const size = PixelRatio.roundToNearestPixel(
    (width - itemMargin * (numColumns - 1)) / numColumns,
  );
  const handlePicker = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    const pickerConfiguration = {
      aspect: [4, 4],
      quality: 0.3,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    };

    let result = await ImagePicker.launchCameraAsync(pickerConfiguration);
    if (result.cancelled) {
      return;
    }

    setChooseMedia(false);
    onPressTakePhoto(result?.uri);
  };

  return (
    <TouchableOpacity
      style={[Styles.bgImagePicker, {width: size}]}
      onPress={handlePicker}>
      <EvilIcons name={'camera'} size={40} color={'gray'} />
    </TouchableOpacity>
  );
};

CusomImagePicker.propTypes = {
  onPressTakePhoto: PropTypes.func,
  itemMargin: PropTypes.number,
  numColumns: PropTypes.number,
};

const Styles = StyleSheet.create({
  bgImagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
});
