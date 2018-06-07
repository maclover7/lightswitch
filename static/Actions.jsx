import Dispatcher from './Dispatcher.jsx';

const Actions = {
  login(name) {
    Dispatcher.dispatch({
      type: 'login',
      name
    });
  },

  receiveAlert(data) {
    Dispatcher.dispatch({
      type: 'receive-alert',
      data
    });
  },

  receiveCue(data) {
    Dispatcher.dispatch({
      type: 'receive-cue',
      data
    });
  },

  receiveNoCue(data) {
    Dispatcher.dispatch({
      type: 'receive-no-cue',
      data
    });
  },

  sendAlert(data) {
    Dispatcher.dispatch({
      type: 'send-alert',
      data
    });
  },

  updateUsers(users) {
    Dispatcher.dispatch({
      type: 'users',
      users
    });
  }
};

export default Actions;
