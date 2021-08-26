import { Titlebar, Color } from '@treverix/custom-electron-titlebar';
import { Menu, MenuItem } from '@electron/remote';

console.log('preload.js is running...');

const showAboutDialog = () => {
  /*dialog.showMessageBox(window, {
    title: 'About this application',
    message: 'Version: 1.0.0',
  });*/
  console.log('about');
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
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
            showAboutDialog();
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
