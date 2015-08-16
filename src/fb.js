"use strict";

import Firebase from 'firebase';
const rootUrl  = "INSERT-FIREBASE-URL-HERE";

/**
 * Connect to Firebase API.
 * Returns a connection to Firebase root or a specific record.
 */
export function connect(record) {
  var r = record ? record : '';
  return new Firebase(rootUrl + 'items/' + r);
}
