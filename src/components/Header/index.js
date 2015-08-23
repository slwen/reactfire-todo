'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    name: React.PropTypes.string
  },

  renderName() {
    if (this.props.name) {
      return (
        <span className="Header__name">
          { this.props.name }
        </span>
      );
    }
  },

  render() {
    return (
      <div className="Header">
        <h1 className="Header__title">Todos</h1>
        { this.renderName() }
      </div>
    );
  }
});
