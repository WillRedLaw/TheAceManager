const { create } = require('combined-stream')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain


function createParentWindow(){

  const win = new BrowserWindow({

      width: 400,
      height: 600,
      frame: false,

      webPreferences: {

        nodeIntegration: true,
        contextIsolation: false,
        devTools: false,


      }

  })

  win.loadFile('./src/HTML/Login.html')

  ipc.on('SwitchWindow', () =>{

    win.close()
    
    app.whenReady().then(() => {
      createChildWindow()
    
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createChildWindow()
        }
      })
    })
    

  })

}

function createChildWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    frame: false,
    webPreferences: {

        nodeIntegration: true,
        contextIsolation: false,
        
        devTools: false,
  
    }
  })

  win.loadFile('./src/HTML/mainWindow.html')

  ipc.on('closeApp', () =>{
    win.close()
  })
  ipc.on('minimizeApp', () =>{
    win.minimize()
  })

  ipc.on('maximizeApp', () => {
    if(win.isMaximized()){
      win.restore()
    } 

    else{
      win.maximize();
    }
  })

  win.on('maximize', () => {
    win.webContents.send('isMaximized')
  })

  win.on('restored', () => {
    win.webContents.send('isRestored')
  })
}

app.whenReady().then(() => {
  createParentWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createParentWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})