'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactFire from 'reactfire'
import ls from 'local-storage'
import { auth, connect } from './lib/fb'
import Header from './components/Header'
import SignIn from './components/SignIn'
import List from './components/List'

import fbStoreName from './firebase-app-name'

const App = React.createClass({
  displayName: 'App',
  mixins: [ ReactFire ],

  getInitialState() {
    return {
      items: {},
      loaded: false,
      session: ls.get(`firebase:session::${fbStoreName}`)
    }
  },

  componentWillMount() {
    if (this.state.session) this.firebaseConnect()
  },

  firebaseDisconnect() {
    this.setState({ session: null })
  },

  firebaseConnect() {
    this.fb = connect(this.state.session.auth.uid)
    this.bindAsArray(this.fb, 'items', this.firebaseDisconnect)
    this.fb.on('value', this.handleDataLoaded)
  },

  handleDataLoaded() {
    this.setState({ loaded: true })
  },

  handleBulkDelete() {
    let batch = {}

    this.state.items.forEach(item => {
      if (item.done) {
        batch[item['.key']] = null
      }
    })

    this.fb.update(batch)
  },

  handleAuth() {
    if (!this.state.session) {
      auth((session) => {
        this.setState({ session })
        this.firebaseConnect()
      })
    }
  },

  render() {
    const { session, loaded, items } = this.state

    if (session && loaded) {
      return (
        <div className="App App--signed-in">
          <Header name={ session.github.displayName } />
          <List
            itemStore={ this.firebaseRefs.items }
            items={ this.state.items }
            clear={ this.handleBulkDelete }
            uid={ session.auth.uid } />
        </div>
      )
    }

    if (session && !loaded) {
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
