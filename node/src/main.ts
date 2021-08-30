import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import path from 'path';
import actions, { Actions } from './actions';

require('@electron/remote/main').initialize();

export default class Main {
  static mainWindow?: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: typeof BrowserWindow;
  static actions: Actions;

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
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    Main.mainWindow.webContents.openDevTools();
    Main.mainWindow.loadURL('http://localhost:3000');
    Main.mainWindow.on('closed', Main.onClose);
    Main.actions = actions(Main.mainWindow!);
    globalShortcut.register('CommandOrControl+O', Main.actions.openFolder);
    ipcMain.handle('openFolder', Main.actions.openFolder);
    ipcMain.handle('listFiles', Main.actions.listFiles);
    ipcMain.handle('readMetadata', Main.actions.readMetadata);
    ipcMain.handle('showAboutDialog', Main.actions.showAboutDialog);
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
