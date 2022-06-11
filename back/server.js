#!/usr/bin/env node

"use strict"
/* Dependencies */
const mongoose = require("mongoose");
const WebSocket = require("ws");

/* others */
//const PORT = process.env.PORT || 3001;
const { DATABASE } = require('./config.js');
const PORT = 8080
const { Notifications } = require("./models/notifications.model.js");
const { userController, preloadUser } = require("./controllers/notifications.controller.js");

const ws = new WebSocket.Server({ port: PORT })

mongoose.connect( DATABASE )
  .then( () => console.log('Database: Connected') )
  .catch( err => console.error("Database: Could not connect", err) );

ws.on('connection', (socket) => {
  socket.send("Bienvenido")
  socket.on('message', async (msg) => {
    let res = JSON.parse(msg)

    //userController(socket, res)
    socket.send("Take this back: " + JSON.stringify(res));
  })
  socket.on('close', () => {
    console.log('I lost a client');
  })
})
ws.on()


/* 
Example of express parse: https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js

Documentation of Event: https://github.com/websockets/ws/blob/master/doc/ws.md#event-headers
*/