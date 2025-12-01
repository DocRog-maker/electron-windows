const { app, BrowserWindow } = require('electron');
const log = require('electron-log');

app.on('ready', () => {
  log.info('App is ready');
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: __dirname + '/preload.js',
      contextIsolation: true
    }
  });

  //Hide the default title bar
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html')

});

