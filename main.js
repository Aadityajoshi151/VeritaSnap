const { app, BrowserWindow,globalShortcut,ipcMain,dialog} = require('electron')
const path = require('path')
const sound = require("sound-play");
const firstRun = require('electron-first-run');
let win
const msgboxoptions = {
  title:"Welcome",
  icon:path.join(__dirname, 'assets/icons/png/clapping.png'),
  buttons:["OK"],
  message:"Congratulations on installing VeritaSnap!",
  detail:"-Use Ctrl + Shift + P to take a screenshot.\n-The images will be saved in Pictures/Veritasnap.\n-The application will start automatically on startup.There is no need to run the application manually."
}
const filePath = path.join(process.resourcesPath, "shutter.mp3");
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

  // Open the DevTools.
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
    win.webContents.send("Second Instance");
    return;
  })
}

app.on('ready',() => {
  const isFirstRun = firstRun()
  console.log(isFirstRun);
  dialog.showMessageBox(null,msgboxoptions);
  createWindow()
  globalShortcut.register('CommandOrControl+Shift+P', () => {
      win.webContents.send('takess');
    })
    var VeritaSnapAutoLauncher = new AutoLaunch({
      name: 'VeritaSnap',
      path: app.getPath("exe"),
    });
    VeritaSnapAutoLauncher.enable();
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
