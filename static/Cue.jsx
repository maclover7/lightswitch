import React from 'react';

import Dispatcher from './Dispatcher.jsx';

class Cue extends React.Component {
  constructor(props) {
    super(props);

    this.state = { runningState: '', timeRemaining: '' };
  };

  componentDidMount() {
    this.handleCueToken = Dispatcher.register((dispatch) => {
      this.handleCue(dispatch);
    });
  };

  componentWillUnmount() {
    Dispatcher.unregister(this.handleCueToken);
  };

  handleCue(dispatch) {
    if (dispatch.type != 'receive-cue') { return; }
    var cue = dispatch.data;

    if (this.props.id != cue.id) {
      return;
    }

    if (cue.timeRemaining < 0.5) {
      this.props.removeCue(cue);
    } else {
      this.setState({
        runningState: cue.runningState,
        timeRemaining: cue.timeRemaining
      });
    }
  };

  render() {
    return (
      <div className="alert alert-info" role="alert">
        <p>Name: {this.props.name} (#{this.props.id})</p>
        <p>Status: {this.state.runningState}</p>
        <p>Time Remaining: {this.state.timeRemaining} secs</p>
      </div>
    );
  };
};

export default Cue;
