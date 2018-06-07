import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AlertClock from './AlertClock.jsx';

class AlertBody extends React.Component {
  constructor(props) {
    super(props);

    this.blink = this.blink.bind(this);
  };

  blink(el) {
    var that = this;
    $(el).fadeOut('slow', function() {
      $(this).fadeIn('slow', function() {
       that.blink(this);
      });
    });
  };

  componentDidMount() {
    this.blink(
      $(ReactDOM.findDOMNode(this))
    );
  };

  render() {
    return (
      <h4>
        {this.props.sender} (<AlertClock time={this.props.time} />)
      </h4>
    );
  };
};

export default AlertBody;
