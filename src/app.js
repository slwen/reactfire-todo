'use strict';

import React from 'react';
import ReactFire from 'reactfire';
import Header from './header';
import List from './list';
import { connect } from './fb';

var App = React.createClass({
  displayName: 'App',
  mixins: [ ReactFire ],

  getInitialState: function() {
    return {
      items: {},
      loaded: false
    };
  },

  componentWillMount: function() {
    this.fb = connect();
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },

  handleDataLoaded: function() {
    this.setState({ loaded: true });
  },

  handleBulkDelete: function() {
    for (var key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  },

  render: function() {
    return (
      <div>
        <div>
          <div>
            <Header itemsStore={ this.firebaseRefs.items } />
          </div>
          <List
            items={ this.state.items }
            loaded={ this.state.loaded }
            clear={ this.handleBulkDelete } />
        </div>
      </div>
    );
  }
});

React.render(<App />, document.querySelector('#app'));
