'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import store from "./store"
import proxy from "./plugins/proxy"

const isDevelopment = process.env.NODE_ENV !== 'production'
store.commit('updateField', { path: 'isServerRunning', value: false })

let win

proxy.onError(function (ctx, err) {
  console.log("error! : " + err);
  switch (err.code) {
    case 'EADDRINUSE':
      proxy.isRunning = false
      win.webContents.send('message', {
        msg: 'port_already_used',
        type: 'error',
      });
      store.commit('updateField', { path: 'isServerRunning', value: false })
      win.webContents.send('server-state-changed')
      break;
    default:
      break;
  }
})

ipcMain.on('toggle-server', () => {
  proxy.changePort(store.state.serverPort)

  if (!proxy.isRunning) {
    proxy.start()
    win.webContents.send('message', {
      msg: 'starting_server',
      type: 'info',
    })
  } else {
    proxy.close()
    win.webContents.send('message', {
      msg: 'shutdowning_server',
      type: 'error',
    })
  }

  store.commit('updateField', { path: 'isServerRunning', value: proxy.isRunning })
  win.webContents.send('server-state-changed')
});


protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  win = new BrowserWindow({
    width: 800, height: 800, webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null;
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
