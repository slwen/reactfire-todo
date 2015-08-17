'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    itemsStore: React.PropTypes.object
  },

  getInitialState: function() {
    return { text: '' };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (this.state.text !== '') {
      this.props.itemsStore.push({
        text: this.state.text,
        done: false
      });

      this.setState({ text: '' });
    }
  },

  handleInputChange: function(e) {
    this.setState({ text: e.target.value });
  },

  render: function() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          value={ this.state.text }
          onChange={ this.handleInputChange }
          type="text" />

        <span>
          <button type="submit">
            Add New
          </button>
        </span>
      </form>
    );
  }
});
