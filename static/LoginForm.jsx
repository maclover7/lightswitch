import React from 'react';

import Actions from './Actions.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    Actions.login(this.state.name);
  };

  render() {
    return (
      <div id="welcome-area">
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <h3>Log in:</h3>
            <label>Enter name</label>
            <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  };
};

export default LoginForm;
