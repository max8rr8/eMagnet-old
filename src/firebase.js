import firebase from 'firebase/app'
import 'firebase/database'


const isDev = process.env.NODE_ENV == 'development'

const firebaseConfig = {
  apiKey: 'AIzaSyBt8GFVcgi7Zm3bIYnMgf28C1LtWOVRFXc',
  authDomain: 'emagnet-725ed.firebaseapp.com',
  databaseURL: isDev
    ? 'htttp://localhost:9000/?ns=emagnet-725ed'
    : 'https://emagnet-725ed.firebaseio.com',
  projectId: 'emagnet-725ed',
  storageBucket: 'emagnet-725ed.appspot.com',
  messagingSenderId: '481420905815',
  appId: '1:481420905815:web:aedba870845cbec1008212',
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export const usersRef = database.ref('users')
