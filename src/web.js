import React from 'react'
import { hydrate } from 'react-dom'
import { database } from './firebase'
import {
  FirebaseDatabaseContext,
  FirebaseDatabaseProvider,
} from './hooks/useFirebasDatabse'
import App from './App'


let db =   new FirebaseDatabaseProvider()
db.deserialize(database, window.FIREBASE_HOOK_CACHE)

hydrate(
  <FirebaseDatabaseContext.Provider value={db}>
    <App />
  </FirebaseDatabaseContext.Provider>,
  document.getElementById('app')
)