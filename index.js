import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { Button } from '@material-ui/core';
import { useLocalStorage } from './useLocalStorage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const firebaseConfig = {
  apiKey: 'AIzaSyBt8GFVcgi7Zm3bIYnMgf28C1LtWOVRFXc',
  authDomain: 'emagnet-725ed.firebaseapp.com',
  databaseURL: 'https://emagnet-725ed.firebaseio.com',
  projectId: 'emagnet-725ed',
  storageBucket: 'emagnet-725ed.appspot.com',
  messagingSenderId: '481420905815',
  appId: '1:481420905815:web:aedba870845cbec1008212',
};

firebase.initializeApp(firebaseConfig);
let users = firebase.database().ref('users');

let hashCode = function (s) {
  return btoa(
    JSON.stringify(
      s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
    )
  );
};

let correctPass = 'LTEwNzgzMzMzMTk=';

function App() {
  let [loggining, setLoggining] = useState(false);
  let [pass, setPass] = useLocalStorage('pass', '');
  let loggedIn = hashCode(pass) == correctPass;
  let [padawans, setPadawans] = useState([]);

  useEffect((_) => {
    let cb = (e) => {
      let f = e.val();
      let res = []
      for(let e in f){
        res.push({
          comment: '',magnets: 0,
          ...f[e],
          id: e,

        })
      }
      setPadawans(res);
    };
    users.on('value', cb);
    return () => users.off('value', cb);
  });

  return (
    <div>
      {!loggedIn ? (
        <Button
          variant='contained'
          onClick={(e) => {
            let newPass = prompt('Enter rebel code');
            if (hashCode(newPass) == correctPass) alert('Welcome back, obivan');
            else alert('Go away imperial spy');
            setPass(newPass);
          }}
        >
          LOGIN
        </Button>
      ) : (
        'Trainer Obivan Kenobi'
      )}{loggedIn && <br></br>}

      {loggedIn && (
        <Button
          variant='contained'
          onClick={(e) => {
            let name = prompt('Enter padawan name');
            let email = prompt('Enter padawan email');
            users.push({
              name,
              email,
              magnets: 0,
              commnet: ''
            });
          }}
        >
          Add padawan
        </Button>
      )}

      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Mail</TableCell>
              <TableCell align='right'>Magnets</TableCell>
              <TableCell align='right'>Commnet</TableCell>
              {loggedIn &&<TableCell align='right'>Give</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {padawans.map((padawan) => (
              <TableRow key={padawan.email}>
                <TableCell component='th' scope='row'>
                  {padawan.name}
                </TableCell>
                <TableCell align='right'>{padawan.email}</TableCell>
                <TableCell align='right'>{padawan.magnets}</TableCell>
                <TableCell align='right'>{padawan.comment}</TableCell> 
                {loggedIn && <TableCell align='right'><Button onClick={_=>{
                  let n = parseInt(prompt('Enter num of magnets'))
                  let c = prompt('Enter comment')
                  if(loggedIn && !isNaN(n))
                    users.child(padawan.id).child('magnets').set(padawan.magnets + n)
                    users.child(padawan.id).child('comment').set(c)
                }} disabled={!loggedIn}>Give</Button></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

let el = document.createElement('div');
render(<App />, el);
document.body.appendChild(el);
