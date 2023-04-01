import { basicDark } from '../themes/basic-dark/theme'
import { materialDark } from '../themes/material-dark/theme'

export enum SnippetTheme {
  basicDark = 'basicDark',
  materialDark = 'materialDark',
}
const themes = [
  {
    extension: basicDark,
    name: 'Basic Dark',
  },
  {
    extension: materialDark,
    name: 'Material Dark',
  },
]

export default themes
