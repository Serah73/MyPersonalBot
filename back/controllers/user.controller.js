"use strict"

const { TypesMessage, createMessage } = require('../utils/messageManager')
const { User } = require('../models/user.model');

const jwt = require('jsonwebtoken');

const LOCATION = "User.Controller";

async function userRegister(data) {
  if (data.email == null || data.email == undefined) {
    return new createMessage(LOCATION, TypesMessage.error, "Message invalid, check the fields");
  }
  
  let userExist = await User.exists({ email: data.user.email });
  if (userExist != null) { return new createMessage(LOCATION, TypesMessage.error, "User exist") }

  let user = new User();
  user.email = data.user.email;
  user.password = data.user.password;
  user.tg_id = data.user.tg_id;

  try {
    await user.save();
    return new createMessage(LOCATION, TypesMessage.success, "OK") 
  }
  catch (err) {
    return new createMessage(LOCATION, TypesMessage.internalError, "Internal server error");
  }
}

//Falta manejar el token
async function userLogin(data) {
  const userExist = await User.findOne({ "email": data.email });

  if (!userExist) { return new createMessage(LOCATION, TypesMessage.error, "User not found") }
  if (userExist.password !== data.password) { return new createMessage(LOCATION, TypesMessage.error, "User not found") }

  return new createMessage(LOCATION, TypesMessage.success, "Token unavailable");

  const token = jwt.sign(
    {
      _id: userExist._id,
      email: userExist.email
    },
    process.env.PRIVATE_KEY
  );
  
  return new createMessage(LOCATION, TypesMessage.token, token);
}

async function userLogout(data) {
  return new createMessage(LOCATION, TypesMessage.success, "Temporarily unavailable")
}

module.exports = {
  userRegister,
  userLogin,
  userLogout
}