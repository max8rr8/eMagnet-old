import React from 'react'
import { useFirebaseDatabase } from '../hooks/useFirebasDatabse'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { usersRef } from '../firebase'

export default function UserTable({ loggedIn }) {
  let usersState = useFirebaseDatabase(usersRef)
  console.log(usersState)

  const actions = [
    {
      name: 'Give',
      requiresLogin: true,
      action(user, userRef) {
        let n = parseInt(prompt('Enter num of magnets'))
        let c = prompt('Enter comment')

        if (loggedIn && !isNaN(n)) {
          userRef.child('magnets').set(user.magnets + n)
          userRef.child('comment').set(`${user.comment}\n${n} ${c}`)
        }
      },
    },
    {
      name: 'Remove',
      requiresLogin: true,
      action(user, userRef) {
        userRef.remove()
      },
    },
  ]

  return (
    <TableContainer>
      <Table aria-label="users">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Mail</TableCell>
            <TableCell align="right">Magnets</TableCell>
            {actions
              .filter((action) => !action.requiresLogin || loggedIn)
              .map((action) => (
                <TableCell align="right" key={action.name}></TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(usersState.data).map(([id, user]) => (
            <TableRow key={user.email}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.magnets}</TableCell>
              {actions
                .filter((action) => !action.requiresLogin || loggedIn)
                .map((action) => (
                  <TableCell align="right" key={action.name}>
                    <Button
                      onClick={() => action.action(user, usersRef.child(id))}
                      disabled={!loggedIn}
                    >
                      {action.name}
                    </Button>
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
