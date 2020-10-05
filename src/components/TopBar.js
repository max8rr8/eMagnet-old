import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Login from './Login'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    },
    spacer: {
      flexGrow: 1
    }
  })
)

export default function TopBar({ loggedIn, setLoggedIn, toggleTheme }) {
  const styles = useStyles()

  return (
    <AppBar position="static" className={styles.appBar} elevation={1}>
      <Toolbar>
        <div className={styles.spacer} />
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Button onClick={() => toggleTheme()}>
          <Brightness4Icon />
        </Button>
      </Toolbar>
    </AppBar>
  )
}
