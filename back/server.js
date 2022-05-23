#!/usr/bin/env node

"use strict"
/* Dependencies */
const mongoose = require("mongoose");
//const express = require("express");
const http = require("http");
//const cors = require("cors");

const logger = require("morgan");

const WebSocket = require("ws");
const bodyParser = require('body-parser') /* parsing middleware */

/* others */
const PORT = process.env.PORT || 3001;
const { DATABASE } = require('./config.js');
const { Notifications } = require("./models/notifications.model.js");
const { userController, preloadUser } = require("./controllers/notifications.controller.js");

const ws = new WebSocket.Server({ 
  port: 8080 
})
//const app = express();

// app.use(bodyParser.urlencoded({ extended: false, limit:'50mb' }))
// app.use(bodyParser.json({limit:'4mb'}))
// app.use(cors())
//const server = http.createServer(app);

mongoose.connect( DATABASE )
  .then(() => console.log('Database: Connected'))
  .catch(err => console.error("Database: Could not connect", err));

ws.on('connection', (socket) => {
  console.log("Hi bro")

  socket.on('message', (message) => {
    console.log("hi")
  })
  socket.on('close', () => {
    console.log('I lost a client');
  })
})

// server.listen( PORT, () => {
//   console.log(`Server started`)
// })

/* Primera prueba: No está correcta la conectividad entre BBDD y ws */
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false, limit:'50mb' }))
// app.use(bodyParser.json({limit:'4mb'}))


// mongoose.connect(DATABASE, (error, response) => {
//   if(error) {
//     console.log('Error: Database connection fault');
//     throw error;
//   } 
//   else {
//     app.listen(MongoPort, () => {
//       console.log('Db: Server connection open.\n- port: ' + MongoPort)
//     })
//   }
// });
// const notifications = require('./routes/notifications.route')

// app.use(logger('dev'));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// app.use('/notifications/', notifications)

// const wsServer = new WebSocket.Server({
//   port: WsPort
// });

// wsServer.on('connection', (socket) =>{
//     // Some feedback on the console
//     console.log("A client just connected");

//     // Attach some behavior to the incoming socket
//     socket.on('message', (msg) => {
//         console.log("Recieved message from client: " + msg);
//         //socket.send("Take this back: " + msg);


//         //Broadcast that message to all connected clients
//         wsServer.clients.forEach((client) => {
//             client.send("Someone said: " + msg);
//         })
//     })
// })


// console.log("WServer is listening on port: " + WsPort)

/************************************************* */