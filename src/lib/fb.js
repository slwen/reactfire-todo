'use strict'

import Firebase from 'firebase'
import fbStoreName from '../firebase-config'

const rootUrl = `https://${fbStoreName}.firebaseio.com/`
const ref     = new Firebase(rootUrl)

/**
 * Authenticate user with GitHub.
 */
export function auth(callback) {
  ref.authWithOAuthPopup('github', (error, authData) => {
    if (error) {
      console.log('Login Failed!', error)
    }

    callback(authData)
  })
}

/**
 * Connect to Firebase API.
 * Returns a connection to Firebase root or a specific record.
 */
export function connect(uid, record = '') {
  return new Firebase(`${rootUrl}users/${uid}/${record}`)
}
