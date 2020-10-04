import React, { useState, Suspense } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Login from './components/Login'
import UserTable from './components/UserTable'
import AddUser from './components/AddUser'
import GlobalLoading from './components/GlobaLoading'
import { CssBaseline } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  makeStyles,
  createStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { useLocalStorage } from './hooks/useLocalStorage'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    },
    table: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '800px'
    },
    '*': {
      transition: 'background 0.25s, color 0.25s'
    }
  })
)

function TopBar({ loggedIn, setLoggedIn, forceTheme, setForceTheme }) {
  const styles = useStyles()

  return (
    <AppBar position="static" className={styles.appBar} elevation={1}>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Button
          onClick={() =>
            setForceTheme(forceTheme === 'dark' ? 'light' : 'dark')
          }
        >
          <Brightness4Icon />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const styles = useStyles()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [forceTheme, setForceTheme] = useLocalStorage('theme', '')
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type:
            forceTheme === ''
              ? prefersDarkMode
                ? 'dark'
                : 'light'
              : forceTheme
        }
      }),
    [prefersDarkMode, forceTheme]
  )

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<GlobalLoading />}>
        <CssBaseline />
        <style>
          {`
          * {
            transition: background 0.25s, color 0.25s;          
          }
          `}
        </style>
        <TopBar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setForceTheme={setForceTheme}
          forceTheme={forceTheme}
        />

        {loggedIn && <AddUser />}
        <UserTable className={styles.table} loggedIn={loggedIn} />
      </Suspense>
    </ThemeProvider>
  )
}
