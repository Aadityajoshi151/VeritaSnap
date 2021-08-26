const { app, BrowserWindow,globalShortcut,ipcMain} = require('electron')
const path = require('path')
const sound = require("sound-play");
let win
const filePath = path.join(__dirname, "shutter.mp3");

function createWindow () {
  win = new BrowserWindow({
    width: 170,
    height: 70,
    minimizable: false,
    maximizable: false,
    //resizable: false,
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
  //win.setSkipTaskbar(true)

  // Open the DevTools.
  win.webContents.openDevTools()

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
    win.webContents.send("Second Instance");
    return;
  })
}

app.on('ready',() => {
  createWindow()
  globalShortcut.register('CommandOrControl+Shift+P', () => {
      win.webContents.send('takess');
    })
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
ipcMain.on('playsoundeffect', (event) => sound.play(filePath))
