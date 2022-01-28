const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

SwitchScreenBtn.addEventListener('click', () =>{
    ipc.send("SwitchWindow")
})