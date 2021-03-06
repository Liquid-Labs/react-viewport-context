/* global afterEach describe Event expect test */
import React from 'react'
import classNames from 'classnames'

import { ThemeProvider } from '@material-ui/styles'

import { mainPaddingStyles } from './mainPadding'

import { cleanup, render } from 'react-testing-library'
import { defaultTheme } from '../testlib'

import { SheetsRegistry } from 'jss'

import { StylesProvider, makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const useMainPaddingStyles = makeStyles(mainPaddingStyles)

const TestMain = (props) => {
  const classes = useMainPaddingStyles()
  const className = classNames(
    classes.mainPaddingTop,
    classes.mainPaddingSides,
    classes.mainPaddingBottom)

  return <div className={className} {...props}>Hi!</div>
}

const defaultMuiTheme = createMuiTheme(defaultTheme)

describe("mainPaddingStyles", () => {
  afterEach(cleanup)

  test("generates expected padding styles", () => {
    const sheets = new SheetsRegistry()

    const { getByTestId } = render(
      <StylesProvider sheetsRegistry={sheets}>
        <ThemeProvider theme={defaultMuiTheme}>
            <TestMain data-testid='main'/>
        </ThemeProvider>
      </StylesProvider>
    )

    expect(sheets.toString()).toMatchSnapshot()
  })
})
