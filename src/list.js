'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'List',
  propTypes: {
    items: React.PropTypes.object,
    loaded: React.PropTypes.bool.isRequired,
    clear: React.PropTypes.func.isRequired
  },

  render() {
    return <div>I'm a list of todos.</div>;
  }
});
