/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from '@react-native-community/cameraroll';

import Grid from './Grid';

const keyExtractor = ({uri}) => uri;

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [hasNextPage, setNextPage] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [cursor, setCursor] = useState(null);
  let loading = false;

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (cursor) {
      getNextImage(cursor);
    }
  }, [cursor]);

  const getNextImage = () => {
    if (!cursor) {
      return;
    }

    getImages(cursor);
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

    has_next_page && setNextPage(has_next_page);
    end_cursor && setEndCursor(end_cursor);

    setCursor(has_next_page ? end_cursor : null);

    const loadedImages = edges.map((item) => item.node.image);
    setImages(images.concat(loadedImages));
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
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getNextImage()}
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
