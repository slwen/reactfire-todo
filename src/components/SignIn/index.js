'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'SignIn',
  propTypes: {
    handleClick: React.PropTypes.func.isRequired
  },

  handleClick() {
    this.props.handleClick();
  },

  render() {
    return (
      <div className="SignIn">
        <div className="SignIn__body">
          <h1 className="SignIn__title">Reactfire Todo</h1>
          <button
            className="SignIn__button"
            type="button"
            onClick={ this.handleClick }>
            <img src="images/github.svg" />
            &nbsp; Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }
});
