import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList, View} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import {
  widthPercentageToDP,
  heightPercentageToDP,
  responsiveFontSize,
} from '../../utils';

export const useModalDropList = ({list = [], styleItem}) => {
  const keyExtractor = (item, index) => `${index}`;
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.listItem, styleItem]}
        onPress={item.onPress}>
        <Text style={[styles.text, item.textStyle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleDropList = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const dropDown = (
    <Modal
      backdropColor={'#ffffff00'}
      isVisible={isVisible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={toggleDropList}
      onBackdropPress={toggleDropList}>
      <TouchableOpacity style={styles.bg} onPress={toggleDropList} />
      <View style={styles.list}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    </Modal>
  );

  return [dropDown, toggleDropList];
};

const styles = StyleSheet.create({
  container: {},
  list: {
    position: 'absolute',
    width: widthPercentageToDP(15),
    height: heightPercentageToDP(10),
    zIndex: 2,
    borderRadius: 8,
    shadowColor: '#eee',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
  },
  listItem: {
    marginVertical: heightPercentageToDP(0.5),
  },
  text: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
  },
  bg: {
    position: 'absolute',
    backgroundColor: '#ffffff00',
    width: '100%',
    height: '100%',
    opacity: 0.4,
    flex: 1,
    zIndex: 1,
  },
});

useModalDropList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.objectOf({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    }),
  ),
  styleItem: PropTypes.object,
};
