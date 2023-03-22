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

  // Open the DevTools.
  mainWindow.webContents.openDevTools() 

  mainWindow.on('closed', function(){
    // making the mainWindow null

    mainWindow = null;
  })

  // retrieve the event that is send by the renderer process

  ipc.on('open-file-dialog-for-file', function(event){
    // checking the operating system of the user

    dialog.showOpenDialog({
      properties:['openFile']
    }, function(files){
      if(files){
        console.log('send!');
        event.sender.send('selected-file',files[0]);
      }
    })
  })
})