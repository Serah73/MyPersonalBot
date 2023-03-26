#!/usr/bin/env node

"use strict"
/* Dependencies */
const mongoose = require("mongoose");
const WebSocket = require("ws");


/* others */
const PORT = process.env.PORT || 3001;
const { DATABASE } = require('./config.js');

// 1º We need take the Models and Controllers
const { User } = require("./models/user.model")
const { userRegister, userLogin } = require("./controllers/user.controller")

const { Notifications } = require("./models/notifications.model.js");
const { TypesMessage, createMessage } = require("./utils/messageManager");

const TypeExit = {
  success: 0,
  error: 1,
  replay: 2
}

// 2º Take the functionalities
//const { userController, preloadUser } = require("./controllers/notifications.controller.js");


// Start MongoDb
mongoose.set('strictQuery', true); //Revisar funcionamiento?

mongoose.connect( DATABASE )
  .then( () => console.log('Database: Connected') )
  .catch( err => console.error("Database: Could not connect", err) );


// Start with WebScocket
const ws = new WebSocket.Server({ port: PORT })


function help(correctUserLogin) {
  let guide = "User help:\n",options;
  if (!correctUserLogin) {
    options = "\t1 - Sign Up\n";
    options += "\t2 - Log In\n";
  } else {
    options = "\tUnavailable\n"
  }

  return guide + options;
}

async function menuSelector(socket) {
  socket.send("Please, select once(only the number): \n\t(1) - Sign Up\n\t(2) - Log In");
  socket.on('message', (msg) => {
    let message = JSON.parse(msg);
    
    if (message.data != 1 && message.data != 2) {
      console.log("error type");
      socket.send("Option not valid!\n");
      return -1;
    }
    if (message.data === 1) {
      socket.send("Sign Up selected!\nWe need:\n\t(1) Email\n\t(2) Password") //AND TG_ID
      return 1;
    } 
    if (message.data === 2) {
      socket.send("Log In selected!\nWe need:\n\t(1) Email\n\t(2) Password")
      return 2;
    }
    
  })
}

async function register(socket, menuSelection) {
  socket.on('message', async (msg) => {
    let res, message = JSON.parse(msg);
    console.log(message)

    if (menuSelection === 1) { res = await userRegister(message) }
    if (menuSelection === 2) { res = await userLogin(message) }

    if (res.type == TypesMessage.success) {
      socket.send(res.description);
      return TypeExit.success;
    }
    if (res.type == TypesMessage.error) {
      console.log("Error with " + res.location + "\n\t" + res.description);
      socket.send("Ups, something wrong!");
      socket.send(menuLogin);
      return TypeExit.replay;
    }
  })
}

ws.on('connection', async (socket) => {
  socket.send("Welcome to MyPersonalBot!\n")
  console.log("Client connected!")
  
  let res = TypeExit.replay, selection = -1;

  do{
    selection = await menuSelector(socket);
    
    res = await register(socket, selection);
    if (res === TypeExit.replay) help(false);

  } while (res === TypeExit.replay && selection == -1)

  // socket.on('message', async (msg) => {
  //   let res = await userRegister(JSON.parse(msg));
  //   console.log(res)
  //   socket.send(res)
  // })
  
  ///////////// ** Simple example ** ///////////////////
  /*
    socket.send("Bienvenido");

    socket.on('message', async (msg) => {
      let res = JSON.parse(msg)

      socket.send("Take this back: " + JSON.stringify(res));
    })
    socket.on('close', () => {
      console.log('I lost a client');
    })
  */
})


/* 
Example of express parse: https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js

Documentation of Event: https://github.com/websockets/ws/blob/master/doc/ws.md#event-headers
*/