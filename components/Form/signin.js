import React, {useState} from 'react';
import {View, TextInput, Text, Button, StyleSheet} from 'react-native';

const TextInputFiled = ({label, value, onChangeText}) => {
  return (
    <View style={styles.itemFiled}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const SignIn = ({handleSubmit}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onChangeEmail = (text) => {
    setEmail(text);
  };

  const onChangePass = (text) => {
    setPass(text);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
        }}>
        Sign in
      </Text>
      {TextInputFiled({
        label: 'Email',
        value: email,
        onChangeText: onChangeEmail,
      })}
      {TextInputFiled({
        label: 'Password',
        value: pass,
        onChangeText: onChangePass,
      })}
      <Button
        title={'Submit'}
        onPress={() => {
          const data = {
            email,
            password: pass,
          };

          handleSubmit(data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
  itemFiled: {
    marginVertical: 8,
  },
});
