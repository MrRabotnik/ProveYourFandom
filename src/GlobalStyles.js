import { createGlobalStyle } from 'styled-components'

// elements are designed and specified according to a screen height of 1920,
// so for the 4K setup, the base font is scaled up 12.5% (2160 / 1920 = 1.125)
const FONT_SCALE = 100 * window.CONFIG.APP_HEIGHT / 1920

const GlobalStyles = createGlobalStyle`
html {
  font-size: ${FONT_SCALE}%;
}

body {
  --color-blue: #009edb;

  font-family: ATTAleckSans, sans-serif;
  background-color: black;
  color: white;
  line-height: 1.3;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;

  cursor: ${window.CONFIG.DEV.showCursor === true ? 'default' : 'none'};
}

* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

`

export default GlobalStyles
