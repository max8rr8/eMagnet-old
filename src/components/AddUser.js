import React from 'react'
import Button from '@material-ui/core/Button'
import { usersRef } from '../firebase'

export default function AddUser() {
  return (
    <Button
      variant="contained"
      onClick={() => {
        const name = prompt('Enter padawan name')
        if (!name) return
        const email = prompt('Enter padawan email')
        if (!email) return
        usersRef.push({
          name,
          email,
          magnets: 0,
          commnet: ''
        })
      }}
    >
      Add padawan
    </Button>
  )
}
