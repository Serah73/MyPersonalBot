"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = Schema({
  id: Number,
  type_data: String,
  message: Object
});

const Notifications = mongoose.model('Notifications', notificationsSchema);

const User = mongoose.model('User', new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}));

module.exports = {
  Notifications,
  User
}
//module.exports = mongoose.model('Notifications', notificationsSchema);