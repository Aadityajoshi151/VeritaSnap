const { app, BrowserWindow} = require('electron')
const path = require('path')
let win

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

app.on('ready', createWindow)

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
