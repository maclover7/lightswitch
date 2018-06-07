import { ReduceStore } from 'flux/utils';

import Dispatcher from './Dispatcher.jsx';
import Socket from './Socket.jsx';

class Store extends ReduceStore {
  constructor() {
    super(Dispatcher);
  };

  getInitialState() {
    return {
      alerts: [],
      currentUser: {},
      enabledSoundInformation: false,
      loggedIn: false,
      users: {}
    };
  };

  reduce(state, action) {
    switch (action.type) {
      case 'login':
        var id = Math.random();
        state.currentUser = {
          id: id,
          name: action.name
        };

        state.loggedIn = true;
        Socket.emit('join', { user: state.currentUser });

        return state;
      case 'receive-alert':
        state.alerts = state.alerts.concat(action.data);
        return state;
      case 'send-alert':
        Socket.emit('alert', action.data);
        return state;
      case 'users':
        state.users = action.users;
        return state;
      default:
        return state;
    };
  };
};

export default new Store();
