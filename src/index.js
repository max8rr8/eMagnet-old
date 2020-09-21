import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Login from './components/Login'
import UserTable from './components/UserTable';
import AddUser from './components/AddUser'

function App() {
  let [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn && <AddUser/>}
      <UserTable loggedIn={loggedIn} />
    </div>
  )
}

let el = document.createElement('div');
render(<App />, el);
document.body.appendChild(el);
