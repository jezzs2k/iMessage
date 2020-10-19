import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from '@react-native-community/cameraroll';

import Grid from './Grid';

const keyExtractor = ({uri}) => uri;

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    // console.log(await Permissions.askAsync(Permissions.LOCATION));
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    console.log(status);
    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
    });

    const {edges} = results;
    console.log(edges[0].node.image);
    const loadedImages = edges.map((item) => item.node.image);

    setImages(loadedImages);
  };

  const renderItem = ({item: {uri}, size, marginTop, marginLeft}) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return <Image source={{uri}} style={style} />;
  };
  return (
    <Grid data={images} renderItem={renderItem} keyExtractor={keyExtractor} />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default ImageGrid;
