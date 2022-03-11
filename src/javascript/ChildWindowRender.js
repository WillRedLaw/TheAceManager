/*

    This JavaScript file is in charge of controlling listening and sending methods in the Main.js file
    Works similar to renderer file but it's purpose is to listen out to a certain set of clicks to 
    help organize the file structure more. 

*/


//Variables
const {ipcRenderer} = require('electron')
const axios = require('axios');
const { is } = require('express/lib/request');
const ipc = ipcRenderer
const maxResBtn = document.getElementById('maxResBtn')
const GenPassword = document.getElementById('GetPassword');
const mySidebar= document.getElementById('mySidebar')
var isLeftMenuActive = true;

//Listener Close
closeBtn.addEventListener('click', () =>{
    
    ipc.send('closeApp')
})

//Listener Minimize
minimizeBtn.addEventListener('click', () =>{

    ipc.send('minimizeApp')
})

//Listener Maximize
maxResBtn.addEventListener('click', () =>{
    ipc.send('maximizeApp')
})

//Function for changing resolution of application
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

//sender for max
ipc.on('isMaximized', () =>{
    ChangeMaxResBtn(true)
})

//sender for restore
ipc.on('isRestored', () =>{
    ChangeMaxResBtn(false)
})

showHideMenus.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySidebar.style.width ='0px'
        isLeftMenuActive = false
    }
    else{
        mySidebar.style.width ='280px'
        isLeftMenuActive = true
    }
})


/**
 * -------------------------------------
 */ 
 //sender
 GenPassword.addEventListener('click', () =>{
    ipc.send('PasswordRequested')
 })
 //listener than send request to server using Axios
 ipc.on('PasswordRequested', ()=>{

    makeRequest()
    async function makeRequest(){
        const PASSWORD = {
          method:'get',
          url: 'http://localhost:3000/password',
          
          
        }
    
        let res = await axios(PASSWORD)
        console.log(res.data)
        document.getElementById('Change').innerText = res.data
    
      }
    
 })
 /**
 * -------------------------------------
 */ 