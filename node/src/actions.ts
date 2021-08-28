import { dialog, IpcMainInvokeEvent } from 'electron';
import { readdir, lstat } from 'fs/promises';
import { join } from 'path';

export interface Actions {
  openFolder: () => void;
  listFiles: (event: IpcMainInvokeEvent, args: unknown[]) => void;
  showAboutDialog: () => void;
}

const actions = (mainWindow: Electron.BrowserWindow): Actions =>
  Object.freeze({
    openFolder: async () => {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      });
      const path = result.filePaths[0];
      mainWindow.webContents.send('folderOpened', path);
    },
    listFiles: async (_event, args) => {
      const rootPath = args[0] as string;
      const subPath = args[1] as string[];
      const path = join(rootPath, ...subPath);
      const files = await readdir(path);
      const fileDescriptors = await Promise.all(
        files.map(async f => {
          const stats = await lstat(join(path, f));
          return {
            name: f,
            path,
            type: stats.isDirectory() ? 'directory' : stats.isFile() ? 'file' : 'other',
          };
        }),
      );
      mainWindow.webContents.send(
        'filesListed',
        fileDescriptors
          .filter(f => f.type !== 'other')
          .map(f => ({ name: f.name, path: f.path, isDirectory: f.type === 'directory' })),
      );
    },
    showAboutDialog: () => {
      dialog.showMessageBox(mainWindow, {
        title: 'About this application',
        message: 'Version: 1.0.0',
      });
    },
  });

export default actions;
