'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    itemsStore: React.PropTypes.object
  },

  getInitialState() {
    return { text: '' };
  },

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text !== '') {
      this.props.itemsStore.push({
        text: this.state.text,
        done: false
      });

      this.setState({ text: '' });
    }
  },

  handleInputChange(e) {
    this.setState({ text: e.target.value });
  },

  render() {
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
