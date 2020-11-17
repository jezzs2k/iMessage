import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useComponentWillMount} from '../../hooks/useComponentWillMount';

const KeyboardState = ({layout, children}) => {
  const {height} = layout;
  const INITIAL_ANIMATION_DURATION = 250;
  let subscriptions = [];

  const [state, setState] = useState({
    contentHeight: height,
    keyboardHeight: 0,
    keyboardVisible: false,
    keyboardWillShow: false,
    keyboardWillHide: false,
    keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
  });

  const componentWillMount = () => {
    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', keyboardWillShowFun),
        Keyboard.addListener('keyboardWillHide', keyboardWillHideFun),
        Keyboard.addListener('keyboardDidShow', keyboardDidShowFun),
        Keyboard.addListener('keyboardDidHide', keyboardDidHideFun),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidHide', keyboardDidHideFun),
        Keyboard.addListener('keyboardDidShow', keyboardDidShowFun),
      ];
    }
  };

  useEffect(() => {
    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  });

  const keyboardWillShowFun = (event) => {
    setState((state) => ({...state, keyboardWillShow: true}));
    measure(event);
  };
  const keyboardWillHideFun = (event) => {
    setState((state) => ({...state, keyboardWillHide: true}));
    measure(event);
  };
  const keyboardDidShowFun = () => {
    setState((state) => ({
      ...state,
      keyboardWillShow: false,
      keyboardVisible: true,
    }));
  };
  const keyboardDidHideFun = (event) => {
    setState((state) => ({
      ...state,
      keyboardWillHide: false,
      keyboardVisible: false,
    }));

    measure(event);
  };

  const measure = (event) => {
    const {layout} = this.props;
    const {
      endCoordinates: {height, screenY},
      duration = INITIAL_ANIMATION_DURATION,
    } = event;

    setState((state) => ({
      ...state,
      contentHeight: screenY - layout.y,
      keyboardHeight: height,
      keyboardAnimationDuration: duration,
    }));
  };

  useComponentWillMount(componentWillMount);
  const {
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  } = state;

  return children({
    containerHeight: layout.height,
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  });
};

KeyboardState.propTypes = {
  layout: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export default KeyboardState;
