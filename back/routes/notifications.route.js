const express = require('express');
const api = express.Router();
const NotificationsController = require('../controllers/notifications.controller');

// api.post('/list', NotificationsController.getList);
api.get('/list', NotificationsController.register);

module.exports = api;