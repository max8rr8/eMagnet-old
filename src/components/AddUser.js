import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { usersRef } from '../firebase'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark
      }
    }
  })
)

export default function AddUser() {
  const styles = useStyles()
  return (
    <Fab
      aria-label="add"
      className={styles.fab}
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
      <AddIcon />
    </Fab>
  )
}
