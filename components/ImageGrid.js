/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from '@react-native-community/cameraroll';

import Grid from './Grid';

const keyExtractor = ({uri}) => uri;

const ImageGrid = ({onPressImage}) => {
  const [images, setImages] = useState([]);
  const [cursor, setCursor] = useState(null);

  let loading = false;

  useEffect(() => {
    getImages();
  }, []);

  const getNextImage = (cursorLocal) => {
    if (!cursorLocal) {
      return;
    }

    getImages(cursorLocal);
  };

  const getImages = async (after) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (loading) {
      return;
    }

    loading = true;

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const {
      edges,
      page_info: {has_next_page, end_cursor},
    } = results;

    const loadedImages = edges.map((item) => item.node.image);

    setCursor(has_next_page ? end_cursor : null);
    loading = false;
    setImages(images.concat(loadedImages));
  };

  const renderItem = ({item: {uri}, size, marginTop, marginLeft, index}) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity activeOpacity={0.75} onPress={() => onPressImage(uri)}>
        <Image source={{uri}} style={style} />
      </TouchableOpacity>
    );
  };
  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={() => getNextImage(cursor)}
      onEndReachedThreshold={0.5}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    maxHeight: 300,
  },
});

export default ImageGrid;
