'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Todo',
  propTypes: {
    text: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired
  },

  render() {
    return <div>I'm a todo item.</div>;
  }
});
