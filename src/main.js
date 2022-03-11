/*

    This is the start up file for the application, here is where everything to do with the screens of the application can be controlled. 
    When the command npm start is used this is where the file path will go, it is linked to the package-json file which
    also helps to control the application. 

*/

//required variables to access file requirements. 
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const axios = require('axios')
const { type } = require('express/lib/response')
const ipc = ipcMain


//Function declaration for the Parent Window IE the login screen you see upon start up of the application. 
function createParentWindow(){

  const ParentWindow = new BrowserWindow({

      width: 400,
      height: 600,
      frame: false,

      webPreferences: {

        nodeIntegration: true,
        contextIsolation: false,
        devTools: false,

      }

  })

//calls the HTML file from the source folder for the Login
ParentWindow.loadFile('./src/HTML/Login.html')

//While on the parent window, it will listen out for the response "SwitchWindow", which will than call this. 
ipc.on('SwitchWindow', () =>{

  //close the current parent window
  ParentWindow.hide()
  
  //Open a child window
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

//The Same as the parent APP except for the child window
function createChildWindow () {
  const ChildWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    frame: false,
    webPreferences: {

        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, "../src/javascript/PasswordGenerator/CallPassword.js"),
        devTools: false,
  
    }
  })


  //calls the mainWindow file from the source folder
  ChildWindow.loadFile('./src/HTML/mainWindow.html')
  
  //listens out to the close app command and closes the window
  ipc.on('closeApp', () =>{
    app.quit()
    
  })

  //listen out to the minimize command and minimizes the window
  ipc.on('minimizeApp', () =>{
    ChildWindow.minimize()
  })

  //listens out for the maximize command and maximizes the window 
  ipc.on('maximizeApp', () => {
    if(ChildWindow.isMaximized()){
      ChildWindow.restore()
    } 

    else{
      ChildWindow.maximize();
    }
  })

  //sender for requesting a generated password
  ipc.on('PasswordRequested',()=>{
    ChildWindow.webContents.send('PasswordRequested')
  })

  ipc.on('SideMenu', () => {
    console.log('clicked')
    ChildWindow.webContents.send('SideMenu')
  })
  //sender for max
  ChildWindow.on('maximize', () => {
    ChildWindow.webContents.send('isMaximized')
  })

  //sender for restore
  ChildWindow.on('restored', () => {
    ChildWindow.webContents.send('isRestored')
    
  })
}

//creator function for the parent window
app.whenReady().then(() => {
  createParentWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createParentWindow()
    }
  })
})

//checker
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


