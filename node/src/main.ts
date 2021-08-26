import { BrowserWindow } from 'electron';
import path from 'path';

const APP = 'file://' + __dirname + '/app/index.html';

require('@electron/remote/main').initialize();

export default class Main {
  static mainWindow?: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: typeof BrowserWindow;

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    Main.mainWindow = undefined;
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    Main.mainWindow.webContents.openDevTools();
    Main.mainWindow.loadURL(APP);
    Main.mainWindow.on('closed', Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class1 has no dependencies.  This
    // makes the code easier to write tests for

    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}
