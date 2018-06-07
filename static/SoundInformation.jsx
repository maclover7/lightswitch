import React from 'react';

import Actions from './Actions.jsx';
import Dispatcher from './Dispatcher.jsx';
import { connectToSocket, disconnectFromSocket } from './SoundInformationSocket.jsx';

import Cue from './Cue.jsx';

class SoundInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false, cues: [], lastCueNumber: '' };
  };

  componentDidMount() {
    connectToSocket();

    this.handleCueToken = Dispatcher.register((dispatch) => {
      this.handleCue(dispatch)
    });

    this.handleNoCueToken = Dispatcher.register((dispatch) => {
      this.handleNoCue(dispatch);
    });
  };

  componentWillUnmount() {
    disconnectFromSocket();

    Dispatcher.unregister(this.handleCueToken);
    Dispatcher.unregister(this.handleNoCueToken);
  };

  handleCue(dispatch) {
    if (dispatch.type != 'receive-cue') { return; }
    var msg = dispatch.data;

    var existingCue = this.state.cues.find((c) => {
      if (!c) {
        return false;
      } else {
        return c.id == msg.id;
      }
    });

    var validCue = (cue) => {
      return (
        msg.timeRemaining > 0.5 &&
          !msg.name.includes("<QLab::Reply") &&
          msg.runningState
      );
    };

    if (existingCue) {
      this.setState({ active: true });

      if (existingCue.timeRemaining < 0.5) {
        removeCue(existingCue);
      }
    } else {
      if (validCue(msg)) {
        this.setState((state) => {
          return {
            active: true,
            cues: state.cues.concat(msg)
          };
        });
      }
    }
  };

  handleNoCue(dispatch) {
    if (dispatch.type != 'receive-no-cue') { return; }

    this.setState((state) => {
      if (!state.cues || state.cues.length == 0) {
        return { active: false, cues: [] };
      } else {
        var pausedCues = state.cues.some((c) => {
          return c.runningState == 'paused';
        });

        if (pausedCues) {
          return { active: true, cues: state.cues };
        } else {
          var lastCue = [state.cues[state.cues.length - 1]] || [];
          if (lastCue) {
            lastCue.runningState = '';
            lastCue.timeRemaining = '';
          }

          return {
            active: false,
            cues: [].concat.apply([], lastCue, [])
          };
        }
      }
    });
  };

  render() {
    return (
      <div>
        <h3>Sound FX</h3>
        { this.renderNoCues() }
        { this.renderCues() }
      </div>
    );
  };

  renderCues() {
    if (this.state.active) {
      var cuesList = this.state.cues.map((cue, index) => {
        return <Cue key={cue.id}
                    id={cue.id}
                    name={cue.name}
                    removeCue={(c) => this.removeCue(c)} />
      });

      return (
        <div className="well">
          <ul>{cuesList}</ul>
        </div>
      );
    }
  };

  removeCue(cue) {
    this.setState({
      lastCueNumber: cue.id,
      cues: this.state.cues.filter((c) => { return c.id !== cue.id })
    });
  };

  renderNoCues() {
    if (!this.state.active) {
      var mostRecent = <p></p>;

      if (this.state.lastCueNumber) {
        var mostRecent = <p>Most recent cue was #{this.state.lastCueNumber}.</p>;
      }

      return (
        <div>
          <p>No active cues.</p>
          {mostRecent}
        </div>
      );
    }
  };
};

export default SoundInformation;
