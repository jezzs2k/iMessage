import io from 'socket.io-client';

const socket = io('http://392310a9bd02.ngrok.io');

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
    if (payload && Object.entries(payload).length > 0 ) {
      console.log(payload);
      callback();
    }
  });
};

export const createConversation = () => {};
