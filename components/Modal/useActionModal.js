import React from 'react';
import {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {heightPercentageToDP} from '../../utils';

export const useActionModal = ({
  type = 'text',
  isDark = false,
  onModalHide = undefined,
  onModalShow = undefined,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = useCallback(
    (data) => {
      console.log(data);
      setIsVisible(!isVisible);
    },
    [isVisible],
  );

  const onPressModal = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const ActionItem = ({nameIcon, titleIcon, isDark}) => {
    return (
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons
          name={nameIcon}
          size={30}
          color={isDark ? '#fff' : '#000'}
        />
        <Text style={isDark ? {color: '#fff'} : {color: '#000'}}>
          {titleIcon}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContentBar = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <ActionItem
              nameIcon={'reply'}
              titleIcon={'Reply'}
              isDark={isDark}
            />
            <ActionItem nameIcon={'edit'} titleIcon={'Edit'} isDark={isDark} />
            <ActionItem
              nameIcon={'content-copy'}
              titleIcon={'Copy'}
              isDark={isDark}
            />
            <ActionItem
              nameIcon={'delete'}
              titleIcon={'Remove'}
              isDark={isDark}
            />
          </>
        );
      case 'image':
        return (
          <>
            <ActionItem
              nameIcon={'reply'}
              titleIcon={'Reply'}
              isDark={isDark}
            />
            <ActionItem nameIcon={'edit'} titleIcon={'Edit'} isDark={isDark} />
            <ActionItem
              nameIcon={'save'}
              titleIcon={'Save image'}
              isDark={isDark}
            />
            <ActionItem
              nameIcon={'delete'}
              titleIcon={'Remove'}
              isDark={isDark}
            />
          </>
        );

      case 'location':
        return (
          <>
            <ActionItem
              nameIcon={'reply'}
              titleIcon={'Reply'}
              isDark={isDark}
            />
            <ActionItem nameIcon={'edit'} titleIcon={'Edit'} isDark={isDark} />
            <ActionItem
              nameIcon={'content-copy'}
              titleIcon={'Copy location'}
              isDark={isDark}
            />
            <ActionItem
              nameIcon={'delete'}
              titleIcon={'Remove'}
              isDark={isDark}
            />
          </>
        );
      default:
        return <View />;
    }
  };

  const modal = (
    <Modal
      backgroundColor={'#ffffff00'}
      isVisible={isVisible}
      useNativeDriver
      onBackButtonPress={onPressModal}
      onBackdropPress={onPressModal}
      hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut"
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      style={styles.landscapeStyle}>
      <View
        style={[
          styles.container,
          isDark ? {backgroundColor: '#000'} : {backgroundColor: '#fff'},
        ]}>
        {renderContentBar()}
      </View>
    </Modal>
  );

  return [modal, toggleModal];
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: -21,
    left: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: heightPercentageToDP(2),
  },
  landscapeStyle: {
    width: '100%',
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
  },
});
