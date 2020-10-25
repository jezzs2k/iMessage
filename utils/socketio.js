import io from 'socket.io-client';

const socket = io('https://message-jezzs.azurewebsites.net');

export const connectToServer = () => {
  socket.emit('msgToServer', {
    test: 'Hello',
  });
};

export const createConversation = () => {};
