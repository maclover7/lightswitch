import Actions from './Actions.jsx';

var socket = null;

const connectToSocket = () => {
  if (!socket) {
    socket = io(window.location.href + 'fx');
  }

  socket.on('cue', Actions.receiveCue);
  socket.on('no_cue', Actions.receiveNoCue);
};

const disconnectFromSocket = () => {
  if (socket) {
    socket.off('cue', Actions.receiveCue);
    socket.off('no_cue', Actions.receiveNoCue);
  }
};

export { connectToSocket, disconnectFromSocket };
