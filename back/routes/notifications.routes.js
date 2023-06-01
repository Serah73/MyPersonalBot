const express = require("express");
const api = express.Router();


const NotificationsController = require('../controllers/notifications.controller');

// api.post('/create', ArticleController.create);
// api.delete('/remove/:id', ArticleController.remove);
// api.get('/:id', ArticleController.getDetail);
// api.get('', ArticleController.getList);

module.exports = api;
