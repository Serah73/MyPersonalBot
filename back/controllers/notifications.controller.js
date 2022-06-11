"use strict"

const jwt = require('jsonwebtoken');

const { Notifications, User } = require('../models/notifications.model');
const { SIGNIN, LOGIN, LOGOUT } = require('../actions/user.action');

async function userController(socket, body) {
  console.log("User started")

  if(body.type == SIGNIN){
    console.log("singin: ", body)
    return await signin(socket, body);
  }
  else if(body.type == LOGIN)
    return await login(socket, body);
  else
    return socket.send(JSON.stringify({ code: 400, status: 'error', message: 'Action not found' }));
}

async function signin(socket, body){
  console.log("ey")
  const findUser = await User.findOne({ "email": body.data.email });
  if (findUser)
    return socket.send(JSON.stringify({ code: 409, status: 'error', message: 'user already exists' }))
  
  let user = new User({
    email: body.data.email,
    password: body.data.password,
  });

  await user.save();
  
  return socket.send(JSON.stringify({ code: 200, status: 'success', message: 'user created' }))
}

async function login(socket, body) {
  const userLogin = await User.findOne({ "email": body.data.email });

  if(!userLogin)
    return socket.send(JSON.stringify({ code: 400, status: 'error', message: 'User not found' }))
  
  if(userLogin.password !== body.data.password)
    return socket.send(JSON.stringify({ code: 401, status: 'error', message: 'Wrong credentials' }))

  const token = jwt.sign(
    {
      _id: userLogin._id,
      email: userLogin.email
    },
    process.env.PRIVATE_KEY
  );
  
  return socket.send(JSON.stringify({ 'Token': token }));
}

async function preloadUser(socket) {
  const fetchUsers = await User.find();
  const resUsers = JSON.stringify({ allUsers: fetchUsers });

  socket.send(resUsers);
}


function register(req, res) {
  let notifications = new Notifications();
  let data = req.body;

  notifications.type_data = data.notification.type_data;
  notifications.message = data.notification.message;

  notifications.save((error, data) => {
    if(error) 
      return res.status(500).send({msg: 'Internal Server Error'})
    else
      return res.status(200).send({msg:'Ok'})
  })
}

function getTag(req, res) {
  return res.status(200).send({msg:"Ok. Not aviable"})
}

module.exports = {
  register,
  getTag,

  userController,
  preloadUser,
}