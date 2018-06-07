import React from 'react';

import AlertBody from './AlertBody.jsx';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.props.handleClick(this.props.alert);
  };

  render() {
    return (
      <div className="alert alert-warning alert-dismissible" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleClick}>
          <span aria-hidden="true">×</span>
        </button>

        <AlertBody sender={this.props.sender} time={this.props.time}></AlertBody>
      </div>
    );
  };
};

export default Alert;
