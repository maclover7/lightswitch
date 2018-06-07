import React from 'react';

import AbstractClock from './AbstractClock.jsx';

class AlertClock extends AbstractClock {
  constructor(props) {
    super(props);

    this.time = new Date(this.props.time);
  };

  calculateTime() {
    return (new Date() - this.time) / 1000;
  };

  render() {
    return (
      <span>{this.state.time} secs</span>
    );
  };
};

export default AlertClock;
