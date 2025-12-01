const { app, BrowserWindow } = require('electron');
const log = require('electron-log');

let mainWindow;
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv) => {
    log.info('Second instance launched with args:', argv);
    // argv contains the file path if a PDF was double-clicked
    const filePath = argv.find(arg => arg.endsWith('.pdf'));
    if (filePath && mainWindow) {
      mainWindow.webContents.send('open-pdf', filePath);
    }
  });

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
}
