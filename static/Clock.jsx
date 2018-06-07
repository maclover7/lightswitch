import React from 'react';

import AbstractClock from './AbstractClock.jsx';

class Clock extends AbstractClock {
  calculateTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    var checkTime = function(i) {
      // add zero in front of numbers < 10
      if (i < 10) { i = "0" + i }
      return i;
    };
    m = checkTime(m);
    s = checkTime(s);

    return (h + ":" + m + ":" + s);
  }

  render() {
    return <small>{this.state.time}</small>;
  };
};

export default Clock;
