import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useLocalStorage } from './useLocalStorage'
import { light, dark } from '../themes'

export function useTheme() {
  const userTheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light'
  const [forceTheme, setForceTheme] = useLocalStorage('theme', '')

  const themeType = forceTheme === '' ? userTheme : forceTheme
  const theme = themeType === 'dark' ? dark : light

  return [theme, () => setForceTheme(themeType === 'light' ? 'dark' : 'light')]
}
