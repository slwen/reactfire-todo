'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactFire from 'reactfire'
import ls from 'local-storage'
import { auth, connect } from './lib/fb'
import Header from './components/Header'
import SignIn from './components/SignIn'
import List from './components/List'

const App = React.createClass({
  displayName: 'App',
  mixins: [ ReactFire ],

  getInitialState() {
    const user = ls.get('user')

    return {
      items: {},
      loaded: false,
      user: (user && user.expires < Date.now()) ? user : null
    }
  },

  componentWillMount() {
    this.firebaseConnect()
  },

  firebaseDisconnect() {
    this.setState({ user: null })
  },

  firebaseConnect() {
    if (this.state.user) {
      this.fb = connect(this.state.user.auth.uid)
      this.bindAsObject(this.fb, 'items', this.firebaseDisconnect)
      this.fb.on('value', this.handleDataLoaded)
    }
  },

  handleDataLoaded() {
    this.setState({ loaded: true })
  },

  handleBulkDelete() {
    for (let key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove()
      }
    }
  },

  handleAuth() {
    if (this.state.user) {
      console.log('already logged in')
    } else {
      auth((user) => {
        this.setState({ user })
        ls.set('user', user)
        this.firebaseConnect()
      })
    }
  },

  render() {
    const { user, loaded, items } = this.state

    if (user && loaded) {
      return (
        <div className="App App--signed-in">
          <Header name={ user.github.displayName } />
          <List
            itemStore={ this.firebaseRefs.items }
            items={ this.state.items }
            clear={ this.handleBulkDelete }
            uid={ user.auth.uid } />
        </div>
      )
    }

    if (user && !loaded) {
      return (
        <div className="App App--loading">
          <div className="App__loading-body">
            <div className="App__loading-spinner"></div>
            <div>loading</div>
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        <SignIn handleClick={ this.handleAuth } />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#app'))
