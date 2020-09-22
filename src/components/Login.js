import React, {useEffect} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const isDev = process.env.NODE_ENV == 'development'

function hash(s) {
  return btoa(
    JSON.stringify(
      s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
    )
  )
}

let correctHash = isDev
  ? 'LTIwNjk0NDE3ODQ=' // Password for dev: "onlyHope"
  : 'LTEwNzgzMzMzMTk=' // Password for production: "empire"

export default function Login({ loggedIn, setLoggedIn }) {
  let [pass, setPass] = useLocalStorage('pass', '')

  useEffect(() => {
    if (hash(pass) == correctHash && !loggedIn) setLoggedIn(true)
    if (hash(pass) != correctHash && loggedIn) setLoggedIn(false)
  }, [pass])

  if (loggedIn) return <Typography>Trainer Obivan Kenobi</Typography>
  else
    return (
      <Button
        variant="contained"
        onClick={(e) => {
          let newPass = prompt('Enter rebel code')
          if (hash(newPass) == correctHash) alert('Welcome back, obivan')
          else alert('Go away imperial spy')
          setPass(newPass)
        }}
      >
        LOGIN
      </Button>
    )
}
