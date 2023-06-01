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
const core = require("./commands")

const TypeExit = {
  success: 0,
  error: 1,
  replay: 2
}

// Start MongoDb
mongoose.set('strictQuery', true); //Revisar funcionamiento?

mongoose.connect( DATABASE )
  .then( () => console.log('Database: Connected') )
  .catch( err => console.error("Database: Could not connect", err) );


async function RequestAccount(socket) {
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

/*
https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
*/
// Start with WebScocket
const ws = new WebSocket.Server({ port: PORT })

ws.on('connection', async (socket) => {
  socket.send("Welcome to MyPersonalBot!\n")
  console.log("Client connected!")
  
  //check token
  let res = TypeExit.replay, option = -1;

  do{
    option = await RequestAccount(socket);
    
    core.Register(socket, option)
      .then((res) => socket.send(res.description))
      .catch((err) => socket.send(err))
    
    if (res === TypeExit.replay) help(false);

  } while (res === TypeExit.replay && option == -1)

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