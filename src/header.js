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

  render() {
    return <div>I'm a header.</div>;
  }
});
