import io from 'socket.io-client';

const socket = io('http://c7f4c1f5a2cb.ngrok.io');

export const connectToServer = () => {
  socket.emit('susbcrible-client', {
    userId: Math.random() * 1000,
  });
};

export const createNewRoom = (roomId) => {
  socket.emit('create-room', {
    roomId,
  });
};

export const sendMess = (payload) => {
  socket.emit('send-mess', payload);
};

export const realTimeReveiverMess = (callback) => {
  socket.on('receiver-mess', (payload) => {
    if (payload && Object.entries(payload).length > 0) {
      console.log('payload', payload);
      callback();
    }
  });
};

export const createConversation = () => {};
