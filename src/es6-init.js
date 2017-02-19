import {app, BrowserWindow} from 'electron';
import Config from 'electron-config';
import url from 'url';
import path from 'path';

const config = new Config()
let win = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {

  let opts = {}
  Object.assign(opts, config.get('winBounds'))

  win = new BrowserWindow(opts)

  //win.webContents.openDevTools()

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

   win.on('close', () => {
    config.set('winBounds', win.getBounds())
  })
});