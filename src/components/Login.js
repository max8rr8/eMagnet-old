import React, { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const isDev = process.env.NODE_ENV === 'development'

function hash(s) {
  return btoa(
    JSON.stringify(
      // eslint-disable-next-line unicorn/no-reduce
      s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
    )
  )
}

const correctHash = isDev
  ? 'LTIwNjk0NDE3ODQ=' // Password for dev: "onlyHope"
  : 'LTEwNzgzMzMzMTk=' // Password for production: "empire"

export default function Login({ loggedIn, setLoggedIn }) {
  const [pass, setPass] = useLocalStorage('pass', '')

  useEffect(() => {
    if (hash(pass) === correctHash && !loggedIn) setLoggedIn(true)
    if (hash(pass) !== correctHash && loggedIn) setLoggedIn(false)
  }, [pass, loggedIn, setLoggedIn])

  if (loggedIn) return <Typography>Trainer Obivan Kenobi</Typography>

  return (
    <Button
      variant="contained"
      onClick={() => {
        const newPass = prompt('Enter rebel code')
        if (hash(newPass) === correctHash) alert('Welcome back, obivan')
        else alert('Go away imperial spy')
        setPass(newPass)
      }}
    >
      LOGIN
    </Button>
  )
}
