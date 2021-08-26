import { Titlebar, Color } from '@treverix/custom-electron-titlebar';
import { Menu, MenuItem } from '@electron/remote';
import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'File',
      submenu: [{ role: 'quit' }],
    }),
  );
  menu.append(
    new MenuItem({
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click() {
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
