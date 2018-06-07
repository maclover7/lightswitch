import React from 'react';

import Dispatcher from './Dispatcher.jsx';

import User from './User.jsx';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  };

  componentDidMount() {
    Dispatcher.register(dispatch => {
      if (dispatch.type == 'users') {
        this.setState({ users: dispatch.users });
      }
    });
  };

  render() {
    var usersList = this.state.users.map((user, index) => {
      if (user.id == this.props.currentUser.id) {
      } else {
        return <User key={index}
                     id={user.id}
                     name={user.name}
                     senderName={this.props.currentUser.name}
                     />;
      }
    });

    return (
      <div>
        <h3>Active Users <small>Click the button to alert a user.</small></h3>

        <ul>{usersList}</ul>
      </div>
    );
  }
}

export default Users;
