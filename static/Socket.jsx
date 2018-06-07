import Actions from './Actions.jsx';

const socket = io();

socket.on('users', Actions.updateUsers);
socket.on('alert', Actions.receiveAlert);

export default socket;
