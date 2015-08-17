'use strict';

import React from 'react';
import ReactFire from 'reactfire';
import ls from 'local-storage';
import { auth, connect } from './lib/fb';
import Header from './components/header';
import List from './components/list';

var App = React.createClass({
  displayName: 'App',
  mixins: [ ReactFire ],

  getInitialState: function() {
    return {
      items: {},
      loaded: false,
      user: ls.get('user') || null
    };
  },

  componentWillMount: function() {
    if (this.state.user) {
      this.firebaseConnect();
    }
  },

  firebaseConnect: function() {
    this.fb = connect(this.state.user.auth.uid);
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },

  handleDataLoaded: function() {
    this.setState({ loaded: true });
  },

  handleBulkDelete: function() {
    for (let key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  },

  handleAuth: function() {
    if (this.state.user) {
      console.log('already logged in');
    } else {
      auth((user) => {
        this.setState({ user });
        ls.set('user', user);
        this.firebaseConnect();
      });
    }
  },

  renderAuthenticated: function() {
    if (this.state.user) {
      return (
        <div>
          <div>
            <Header itemsStore={ this.firebaseRefs.items } />
          </div>
          <List
            items={ this.state.items }
            loaded={ this.state.loaded }
            clear={ this.handleBulkDelete }
            uid={ this.state.user.auth.uid } />
        </div>
      );
    }
  },

  render: function() {
    return (
      <div>
        <button type="button" onClick={ this.handleAuth }>
          Login
        </button>
        { this.renderAuthenticated() }
      </div>
    );
  }
});

React.render(<App />, document.querySelector('#app'));
