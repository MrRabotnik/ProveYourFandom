// Electron/NodeJS has 'global' but browser has 'window'
let globalObj
try {
  globalObj = window // Browser
} catch (e) {
  globalObj = global // Node/Electron
}

(function (global) {
  global.CONFIG = {
    APP_NAME: 'EXP: Prove Your Fandom',
    ANALYTICS_ID: '',
    IDLE_TIMEOUT_S: 120,
    ELECTRON_WIDTH: 1080,
    ELECTRON_HEIGHT: 1920,
    DEV: {
      showTools: true,
      showCursor: true,
    },
  }
})(globalObj)
