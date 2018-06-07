import React from 'react';

import Dispatcher from './Dispatcher.jsx';
import Store from './Store.jsx';

import Alert from './Alert.jsx';

class Alerts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { alerts: [] };
  };

  componentDidMount() {
    Dispatcher.register(dispatch => {
      if (dispatch.type == 'receive-alert') {
        var alert = dispatch.data;

        if (this.props.currentUser.id != alert.recipient) {
          return;
        }

        this.setState((state) => {
          return {
            alerts: [].concat.apply([], [alert, state.alerts])
          };
        });
      }
    });
  };


  render() {
    var alertsList = this.state.alerts.map((alert, index) => {
      return <Alert key={alert.time}
                    sender={alert.sender}
                    time={alert.time}
                    alert={alert}
                    handleClick={(a) => this.removeAlert(a)}/>;
    });

    return (
      <div className="well">
        <ul>{alertsList}</ul>
      </div>
    );
  };

  removeAlert(alert) {
    this.setState({
      alerts: this.state.alerts.filter((i) => { return i !== alert })
    });
  };
};

export default Alerts;
