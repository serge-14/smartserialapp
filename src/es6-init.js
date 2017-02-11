import {app, BrowserWindow} from 'electron';
import url from 'url';
import path from 'path';

let win = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  win = new BrowserWindow({width: 1280, height: 720})

  win.webContents.openDevTools()

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
});