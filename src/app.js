'use strict';

import React from 'react';
import ReactFire from 'reactfire';
import Firebase from './fb';
import Header from './header';
import List from './list';

var App = React.createClass({
  displayName: 'App',
  mixins: [ ReactFire ],

  render() {
    return (
      <div>
        <List items={ { foo: "bar" } } />
      </div>
    );
  }
});

React.render(<App />, document.querySelector('#app'));
