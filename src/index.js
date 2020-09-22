import React, { useState, Suspense } from 'react';
import { render } from 'react-dom';
import Login from './components/Login'
import UserTable from './components/UserTable';
import AddUser from './components/AddUser'
import GlobalLoading from './components/GlobaLoading'

function App() {
  let [loggedIn, setLoggedIn] = useState(false);

  return (
    <Suspense fallback={<GlobalLoading />}>
      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn && <AddUser/>}
      <UserTable loggedIn={loggedIn} />
    </Suspense>
  )
}

let el = document.createElement('div');
render(<App />, el);
document.body.appendChild(el);
