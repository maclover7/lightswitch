import React from 'react';

import Actions from './Actions.jsx';
import Dispatcher from './Dispatcher.jsx';
import Store from './Store.jsx';

import Alerts from './Alerts.jsx';
import Clock from './Clock.jsx';
import LoginForm from './LoginForm.jsx';
import SoundInformation from './SoundInformation.jsx';
import Users from './Users.jsx';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();

    this.handleDisableSoundInformation = this.handleDisableSoundInformation.bind(this);
    this.handleEnableSoundInformation = this.handleEnableSoundInformation.bind(this);
  };

  componentDidMount() {
    Dispatcher.register(dispatch => {
      if (dispatch.type == 'login') {
        this.setState({ loggedIn: true });
      }
    });
  };

  handleDisableSoundInformation() {
    this.setState({ enabledSoundInformation: false });
  };

  handleEnableSoundInformation() {
    this.setState({ enabledSoundInformation: true });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="announcements-area">
            { this.renderWelcomeMessage() }
          </div>

          <div className="col-md-6">
            { this.renderLoginForm() }
            { this.renderUsers() }
            <hr />
            { this.renderSoundInformation() }
          </div>

          <div className="col-md-6">
            <h3>My Alerts <Clock />
            </h3>

            <Alerts currentUser={this.state.currentUser} />
          </div>
        </div>
      </div>
    );
  };

  renderLoginForm() {
    if (!this.state.loggedIn) {
      return <LoginForm/>;
    }
  };

  renderSoundInformation() {
    if (this.state.loggedIn) {
      if (this.state.enabledSoundInformation) {
        return (
          <div>
            <button
              type="submit"
              className="btn btn-default"
              onClick={this.handleDisableSoundInformation}>

              Disable Sound Information
            </button>

            <SoundInformation/>
          </div>
        );
      } else {
        return (
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.handleEnableSoundInformation}>

            Enable Sound Information
          </button>
        );
      }
    }
  };

  renderUsers() {
    if (this.state.loggedIn) {
      return <Users currentUser={this.state.currentUser}/>;
    }
  };

  renderWelcomeMessage() {
    if (this.state.loggedIn) {
      return <h3 style={{'textAlign': 'center'}}>Welcome to Lightswitch, { this.state.currentUser.name }!</h3>
    }
  };
};

export default AppContainer;
