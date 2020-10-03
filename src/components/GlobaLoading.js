import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() =>
  createStyles({
    pos: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-20px',
      marginBottom: '-20px'
    }
  })
)

export default function GlobalLoading() {
  const styles = useStyles()
  return (
    <div className={styles.pos}>
      <CircularProgress size={40} />
    </div>
  )
}
