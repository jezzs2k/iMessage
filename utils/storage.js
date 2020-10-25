import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'TOKEN';
const USER = 'USER';

const set_token = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
};

const get_token = async () => {
  return await AsyncStorage.getItem(TOKEN);
};

const set_user = async (user) => {
  await AsyncStorage.setItem('user', user);
};

const clear_all = async () => {
  await AsyncStorage.removeItem(USER);
  await AsyncStorage.removeItem(TOKEN);
};

export {clear_all, set_token, set_user, get_token};
