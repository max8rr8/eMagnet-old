import React, { useState, Suspense } from 'react'
import UserTable from './components/UserTable'
import AddUser from './components/AddUser'
import GlobalLoading from './components/GlobaLoading'
import TopBar from './components/TopBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  makeStyles,
  createStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import { useTheme } from './hooks/useTheme'

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

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const styles = useStyles()
  const [theme, toggleTheme] = useTheme()

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
          toggleTheme={toggleTheme}
        />

        {loggedIn && <AddUser />}
        <UserTable className={styles.table} loggedIn={loggedIn} />
      </Suspense>
    </ThemeProvider>
  )
}
