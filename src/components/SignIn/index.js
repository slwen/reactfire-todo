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
      <div className="signIn">
        <button
          className="signIn__button"
          type="button"
          onClick={ this.handleClick }>
          <img src="images/github.svg" />
          Sign in with GitHub
        </button>
      </div>
    );
  }
});
