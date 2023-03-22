'use strict'

var app = require('electron').app;

var BrowserWindow = require('electron').BrowserWindow;

var os = require('os');

var {dialog} = require('electron');

var mainWindow = null;

var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function(){
  // close the app
  app.quit();
})

app.on('ready', function(){
  // initializing the window

  mainWindow = new BrowserWindow({
    resizable:true,
    height:600,
    width:800,
    webPreferences:{
      nodeIntegration:true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/src/index.html');

  mainWindow.on('closed', function(){
    // making the mainWindow null

    mainWindow = null;
  })

  // retrieve the event that is send by the renderer process

  ipc.on('open-file-dialog-for-file', function(event){
    // checking the operating system of the user

    dialog.showOpenDialog({
      properties:['openFile']
    }),function(files){
      if(files){
        event.sender.send('selected-file',file[0]);
      }
    }
  })
})

// function createWindow () {
//   // Create the browser window.
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//         nodeIntegration: true,
//         contextIsolation: false,
//     },
//   })
 
//   require('@electron/remote/main').initialize()
//   require("@electron/remote/main").enable(win.webContents)

//   // Load the index.html of the app.
//   win.loadFile('src/index.html')
 
//   // Open the DevTools.
//   win.webContents.openDevTools()
// }
 
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// // This method is equivalent to 'app.on('ready', function())'
// app.whenReady().then(createWindow)
 
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // To stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
 
// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the 
//   // app when the dock icon is clicked and there are no
//   // other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
 
// // In this file, you can include the rest of your
// // app's specific main process code. You can also
// // put them in separate files and require them here.
