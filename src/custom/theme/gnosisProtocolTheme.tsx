import { DefaultTheme, ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css } from 'styled-components'
import React, { useMemo } from 'react'

import { Colors } from 'theme/styled'
import {
  colors as colorsUniswap,
  theme as themeUniswap,
  FixedGlobalStyle as FixedGlobalStyleUniswap,
  ThemedGlobalStyle as ThemedGlobalStyleUniswap
} from '@src/theme'
import { useIsDarkMode } from 'state/user/hooks'

export { TYPE } from '@src/theme'
export * from '@src/theme/components'

export function colors(darkMode: boolean): Colors {
  return {
    ...colorsUniswap(darkMode),

    // ****** base ******
    // white: '#FFFFFF,
    // black: '#000000',

    // ****** text ******
    // text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#DCDCDC' : '#565A69',
    // text3: darkMode ? '#6C7284' : '#888D9B',
    // text4: darkMode ? '#565A69' : '#C3C5CB',
    // text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // ****** backgrounds / greys ******
    bg1: darkMode ? '#1E1F2C' : '#FFFFFF',
    bg2: darkMode ? '#2C2D3F' : '#F7F8FA',
    bg3: darkMode ? '#1E1F2C' : '#EDEEF2',
    // bg4: darkMode ? '#565A69' : '#CED0D9',
    // bg5: darkMode ? '#6C7284' : '#888D9B',

    // ****** specialty colors ******
    // modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? '#2B2D3F' : 'rgb(247 248 250)',

    // ****** primary colors ******
    primary1: darkMode ? '#3F77FF' : '#8958FF',
    // primary2: darkMode ? '#3680E7' : '#FF8CC3',
    // primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    // primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : 'rgba(137,88,255,0.6)',

    // ****** color text ******
    primaryText1: darkMode ? '#6da8ff' : '#8958FF',

    // ****** secondary colors ******
    secondary1: darkMode ? '#2172E5' : '#8958FF',
    // secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : 'rgba(137,88,255,0.6)',

    // ****** other ******
    // red1: '#FF6871',
    // red2: '#F82D3A',
    // green1: '#27AE60',
    // yellow1: '#FFE270',
    // yellow2: '#F3841E',
    blue1: '#3F77FF',
    purple: '#8958FF',
    border: darkMode ? '#3a3b5a' : 'rgb(58 59 90 / 10%)',
    disabled: darkMode ? '#31323e' : 'rgb(237, 238, 242)'
  }
}

function themeVariables(colorsTheme: Colors) {
  return {
    body: {
      background: css`
        background: radial-gradient(50% 50%, ${colorsTheme.primary1} 0%, ${colorsTheme.bg1} 100%) 0 -30vh no-repeat;
      `
    },
    appBody: {
      maxWidth: '420px',
      boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  0px 24px 32px rgba(0, 0, 0, 0.01)`,
      borderRadius: '30px',
      border: 'none',
      padding: '1rem'
    },
    buttonLight: {
      fontSize: '16px',
      fontWeight: '500',
      border: 'none',
      borderRadius: 'inherit',
      boxShadow: 'none'
    },
    bgLinearGradient: css`
      background-image: linear-gradient(270deg, ${colorsTheme.purple} 30%, ${colorsTheme.blue1} 70%);
    `
  }
}

export function theme(darkmode: boolean): DefaultTheme {
  const colorsTheme = colors(darkmode)
  return {
    ...themeUniswap(darkmode),
    ...colorsTheme,

    // Overide Theme
    ...themeVariables(colorsTheme)
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const FixedGlobalStyle = createGlobalStyle`
  // Uniswap default
  ${FixedGlobalStyleUniswap}
`

export const ThemedGlobalStyle = createGlobalStyle`
  // Uniswap default
  ${ThemedGlobalStyleUniswap}
`
