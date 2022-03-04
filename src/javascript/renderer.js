/*

The Renderer job is to upon start up of the application, 
is to run any of the important files such as the express server. 

*/


//declares the ipcRenderer requiring electron. 
const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

//When the application is listening out for the click, it will send out the switch window function listened too in main.js
SwitchScreenBtn.addEventListener('click', () =>{
    ipc.send("SwitchWindow")
})


//sets the server to be required and shows the file path.
let server = require('../RestfulAPI/server.js');

