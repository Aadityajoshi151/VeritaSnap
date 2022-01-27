const { app,Menu, BrowserWindow,globalShortcut,ipcMain,Tray, nativeImage,dialog} = require('electron')
const path = require('path')

const options_for_second_instance_lock = {
  type: 'info',
  buttons: ['OK'],
  title: 'Already Running',
  message: 'VeritaSnap Is Already Running. Use Ctrl+Shift+P to take screenshot.',
};
const options_for_quit = {
  type: 'question',
  buttons: ['No','Yes'],
  defaultId: 1,
  title: 'Quit',
  message: 'Are you sure you want to quit?',
};
let win

var AutoLaunch = require('auto-launch');

function createWindow () {
  win = new BrowserWindow({
    width: 170,
    height: 70,
    show:false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    icon: path.join(__dirname, 'assets/icons/png/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // load the index.html of the app.
  win.loadFile('html/index.html')

  win.setMenu(null)
  win.setSkipTaskbar(true)

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}
const gotTheLock = app.requestSingleInstanceLock();  //Second Instance Lock

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    dialog.showMessageBox(null, options_for_second_instance_lock);
    return;
  })
}

app.on('ready',() => {
  createWindow()
  globalShortcut.register('CommandOrControl+Shift+P', () => {
      win.webContents.send('takess');
    })
    var VeritaSnapAutoLauncher = new AutoLaunch({
      name: 'VeritaSnap',
      path: app.getPath("exe"),
    });
    VeritaSnapAutoLauncher.enable();
    const iconPath = path.join(__dirname, "assets/icons/png/icon128.png");
    tray = new Tray(nativeImage.createFromPath(iconPath));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Exit VeritaSnap", click: function () {
          dialog.showMessageBox(null, options_for_quit).then(result => {
            if (result.response)
              app.quit();
          }
          );
        }
      },
    ])
    tray.setToolTip('VeritaSnap')
    tray.setContextMenu(contextMenu)
} )

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
