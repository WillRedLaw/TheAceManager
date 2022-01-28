const {ipcRenderer} = require('electron')
const ipc = ipcRenderer
const maxResBtn = document.getElementById('maxResBtn')

closeBtn.addEventListener('click', () =>{

    ipc.send('closeApp')
})

minimizeBtn.addEventListener('click', () =>{

    ipc.send('minimizeApp')
})

maxResBtn.addEventListener('click', () =>{

    ipc.send('maximizeApp')
})

function ChangeMaxResBtn(isMaximizedApp){
    
    if(isMaximizedApp){

        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoredBtn')
    }

    else{

        maxResBtn.title = 'Maximize'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')

    }

}

ipc.on('isMaximized', () =>{
    ChangeMaxResBtn(true)
})

ipc.on('isRestored', () =>{
    ChangeMaxResBtn(false)
})

