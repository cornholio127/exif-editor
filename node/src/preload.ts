import { Titlebar, Color } from '@treverix/custom-electron-titlebar';
import { Menu, MenuItem } from '@electron/remote';
import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'File',
      submenu: [
        {
          label: 'Open Folder...',
          accelerator: 'CommandOrCtrl+O',
          click: () => {
            ipcRenderer.invoke('openFolder');
          },
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }),
  );
  menu.append(
    new MenuItem({
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            ipcRenderer.invoke('showAboutDialog');
          },
        },
      ],
    }),
  );

  const titlebar = new Titlebar({
    backgroundColor: Color.fromHex('#444444'),
    menu,
  });

  titlebar.updateMenu(menu);
});
