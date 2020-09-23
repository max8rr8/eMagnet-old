import * as functions from 'firebase-functions'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'
import {
  FirebaseDatabaseContext,
  FirebaseDatabaseProvider,
} from './hooks/useFirebasDatabse'
import { renderToStringAsync } from 'react-async-ssr'
import App from './App'

export const app = functions.https.onRequest(async (req, res) => {
  let styles = new ServerStyleSheets()
  let db = new FirebaseDatabaseProvider()
  let appHtml = await renderToStringAsync(
    styles.collect(
      <FirebaseDatabaseContext.Provider value={db}>
        <App />
      </FirebaseDatabaseContext.Provider>
    )
  )

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>eMagnet</title>
      <style id="jss-ssr">${styles.toString()}</style>
    </head>
    <body>
      <script>window.FIREBASE_HOOK_CACHE = ${db.serialize()}</script>
      <div id="app">${appHtml}</div>
      <script src="index.js"></script>
    </body>
    </html>
  `
  res.contentType = 'text/html'
  res.end(html)
})
