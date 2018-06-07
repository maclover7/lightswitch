import React from 'react';

class AbstractClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { time: '' };
  };

  calculateTime() {
  };

  componentDidMount() {
    this._mounted = true;
    this.setTime();
  };

  componentWillMount() {
    this.interval = window.setInterval(function() {
      if (this._mounted) {
        this.setTime();
      }
    }.bind(this), 1000);
  };

  componentWillUnmount() {
    this._mounted = false;
    window.clearInterval(this.interval);
  };

  setTime() {
    this.setState({ time: this.calculateTime() });
  };
};

export default AbstractClock;
