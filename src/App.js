import React, { useState, Suspense } from 'react'

import Login from './components/Login'
import UserTable from './components/UserTable'
import AddUser from './components/AddUser'
import GlobalLoading from './components/GlobaLoading'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Suspense fallback={<GlobalLoading />}>
      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn && <AddUser />}
      <UserTable loggedIn={loggedIn} />
    </Suspense>
  )
}
