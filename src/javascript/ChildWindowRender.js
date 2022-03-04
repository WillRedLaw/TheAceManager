/*

    This JavaScript file is in charge of controlling listening and sending methods in the Main.js file
    Works similar to renderer file but it's purpose is to listen out to a certain set of clicks to 
    help organize the file structure more. 

*/


//Variables
const {ipcRenderer} = require('electron')
const { response } = require('express')
const { get } = require('express/lib/response')
const ipc = ipcRenderer
const maxResBtn = document.getElementById('maxResBtn')

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



/**
 * -------------------------------------
 */

 const GenPassword = document.getElementById('GetPassword');

 
 
 //Listener
 GenPassword.addEventListener('click', () =>{
     ipc.send('PasswordRequested')
 })
 
 ipc.on('PasswordRequested', ()=>{
    
    getPassword()

         
 })
 
 function getPassword(change){

    var DisplayPassword = document.getElementById('Change');
    var change = "THIS PART IS WORKING"
    
    fetch('https:localhost:3000/password').then(response => response.json()).then(data =>{
        console.log(data)
    })

 }

 /*
function getPassword1(){

    $.ajax({
        
        method : 'GET',
        url : '/password',
        success : function(data){
            
            console.log("Success", data)
            return data
        },

        error: function(err){
            console.log('Failed');
        }
    });
}
*/