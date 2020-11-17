import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {connectToServer} from '../../utils/socketio';
import Messages from '../Message/Messages';
import {SignIn} from '../Form/signin';
import {retrive} from '../../redux/action/user/demo';

const Demo = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const retrived = useSelector((state) => state?.user?.demo?.retrived);

  useEffect(() => {
    if (isLogin) {
      console.log('Connect to server');
      connectToServer();
    }
  }, [isLogin]);

  useEffect(() => {
    if (retrived && Object.entries(retrived).length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [retrived]);

  const handleLogin = (data) => {
    dispatch(retrive(data));
  };

  return (
    <>
      {/* {!isLogin && <SignIn handleSubmit={handleLogin} />} */}
      {!isLogin && <Messages />}
    </>
  );
};

const styles = StyleSheet.create({});

export default Demo;
