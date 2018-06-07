import React from 'react';

import Actions from './Actions.jsx';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    var date = new Date().toString();

    Actions.sendAlert({
      recipient: this.props.id,
      sender: this.props.senderName,
      time: date,
      type: 'regular'
    });
  };

  render() {
    return (
      <button type='button'
              className='btn btn-default btn-lg alert-trigger'
              data-user-id={this.props.id}
              onClick={this.handleClick}>
        {this.props.name}
      </button>
    );
  };
};

export default User;
