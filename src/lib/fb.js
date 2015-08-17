'use strict';

import Firebase from 'firebase';

const rootUrl = 'https://amber-fire-8830.firebaseio.com/';
const ref     = new Firebase(rootUrl);

/**
 * Authenticate user with GitHub.
 */
export function auth(callback) {
  ref.authWithOAuthPopup('github', function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    }

    callback(authData);
  });
}

/**
 * Connect to Firebase API.
 * Returns a connection to Firebase root or a specific record.
 */
export function connect(uid, record) {
  let r = record ? record : '';
  return new Firebase(rootUrl + 'users/' + uid + '/' + r);
}
