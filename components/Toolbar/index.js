import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {responsiveFontSize, widthPercentageToDP} from '../../utils';

const ToolbarButton = ({nameIcon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnIcon}>
      <EvilIcons name={nameIcon} size={30} color={'gray'} />
    </TouchableOpacity>
  );
};

const Toolbar = ({
  onSubmit,
  onPressCamera,
  onPressLocation,
  isFocused,
  onChangeFocus,
}) => {
  const [textInput, setText] = useState('');
  const refInput = useRef();

  useEffect(() => {
    if (isFocused) {
      refInput.current.focus();
    } else {
      refInput.current.blur();
    }
  }, [isFocused]);

  const handleChangeText = (text) => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (textInput === '') {
      return;
    }

    onSubmit(textInput);
    setText('');
  };

  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleBlur = () => {
    onChangeFocus(false);
  };

  return (
    <View style={styles.toolbar}>
      <ToolbarButton
        nameIcon={'camera'}
        onPress={() => {
          console.log('Image');
        }}
      />
      <ToolbarButton
        nameIcon={'location'}
        onPress={() => {
          console.log('Location');
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          ref={refInput}
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'Type something!'}
          blurOnSubmit={false}
          value={textInput}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  btnIcon: {
    marginRight: widthPercentageToDP(3),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(3),
  },
});

Toolbar.propTypes = {
  isFocused: PropTypes.bool,
  onChangeFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func,
};
