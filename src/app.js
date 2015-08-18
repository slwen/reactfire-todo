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

  getInitialState() {
    let user = ls.get('user');

    return {
      items: {},
      loaded: false,
      user: (user && user.expires < Date.now()) ? user : null
    };
  },

  componentWillMount() {
    this.firebaseConnect();
  },

  firebaseDisconnect() {
    this.setState({ user: null });
  },

  firebaseConnect() {
    if (this.state.user) {
      this.fb = connect(this.state.user.auth.uid);
      this.bindAsObject(this.fb, 'items', this.firebaseDisconnect);
      this.fb.on('value', this.handleDataLoaded);
    }
  },

  handleDataLoaded() {
    this.setState({ loaded: true });
  },

  handleBulkDelete() {
    for (let key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  },

  handleAuth() {
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

  renderAuthenticated() {
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

  render() {
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
