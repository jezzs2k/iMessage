import React from 'react';
import {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveFontWidth,
  widthPercentageToDP,
  heightPercentageToDP,
  responsiveFontSize,
} from '../utils';
import {Button} from 'react-native-elements';
import {useDeviceOrientation} from '@react-native-community/hooks';

export const useConfirmModal = ({
  title = '',
  subTitle = '',
  onTopPress = undefined,
  onBottomPress = undefined,
  isDark = false,
  onModalHide = undefined,
  onModalShow = undefined,
  topButtonTitle = 'YES',
  bottomButtonTitle = 'NO',
  icon = undefined,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const orientation = useDeviceOrientation();

  const toggleModal = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const _onTopPress = useCallback(() => {
    onTopPress?.();
    toggleModal();
  }, [onTopPress, toggleModal]);

  const _onBottomPress = useCallback(() => {
    onBottomPress?.();
    toggleModal();
  }, [onBottomPress, toggleModal]);

  const modal = (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut"
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      supportedOrientations={['portrait', 'landscape']}
      style={orientation.landscape && styles.landscapeStyle}>
      <View
        style={[
          styles.container,
          isDark ? {backgroundColor: '#000'} : {backgroundColor: '#fff'},
        ]}>
        {icon}
        <Text style={[styles.title, isDark ? {color: '#fff'} : {}]}>
          {title}
        </Text>
        {!!subTitle && (
          <Text style={[styles.subTitle, isDark ? {color: '#fff'} : {}]}>
            {subTitle}
          </Text>
        )}
        <View style={styles.buttonsContainer}>
          <Button
            title={topButtonTitle}
            onPress={_onTopPress}
            buttonStyle={[
              styles.button,
              isDark ? {backgroundColor: '#000', borderColor: '#fff'} : {},
            ]}
            titleStyle={[styles.buttonTitle, isDark ? {color: '#fff'} : {}]}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title={bottomButtonTitle}
            onPress={_onBottomPress}
            buttonStyle={[
              styles.button,
              isDark ? {backgroundColor: '#000', borderColor: '#fff'} : {},
            ]}
            titleStyle={[styles.buttonTitle, isDark ? {color: '#fff'} : {}]}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </Modal>
  );

  return [modal, toggleModal];
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(5.5),
    paddingVertical: heightPercentageToDP(9),
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: responsiveFontWidth(6.1),
    color: '#000',
    textAlign: 'center',
    marginHorizontal: widthPercentageToDP(3),
  },
  subTitle: {
    marginTop: heightPercentageToDP(3),
    fontFamily: 'Quicksand-Regular',
    fontSize: responsiveFontSize(2),
  },
  buttonsContainer: {
    marginTop: heightPercentageToDP(4.8),
  },
  buttonContainer: {
    borderRadius: widthPercentageToDP(8),
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: heightPercentageToDP(1),
  },
  button: {
    backgroundColor: '#fff',
    width: widthPercentageToDP(75),
    paddingVertical: heightPercentageToDP(2.3),
  },
  buttonTitle: {
    color: '#000',
    fontFamily: 'Quicksand-Bold',
    fontSize: responsiveFontWidth(5),
  },
  landscapeStyle: {
    width: heightPercentageToDP(70),
    height: widthPercentageToDP(10),
    alignSelf: 'center',
  },
});
