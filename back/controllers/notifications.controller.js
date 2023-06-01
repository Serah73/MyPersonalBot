"use strict"

const jwt = require('jsonwebtoken');

const { Notifications } = require('../models/notifications.model');
const LOCATION = "Notifications.Controller";

async function preloadUser(socket) {
  const fetchUsers = await User.find();
  const resUsers = JSON.stringify({ allUsers: fetchUsers });

  socket.send(resUsers);
}

function getTag(req, res) {
  return res.status(200).send({msg:"Ok. Not aviable"})
}

module.exports = {
  getTag,
  preloadUser,
}