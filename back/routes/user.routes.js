const express = require("express");
const api = express.Router();


const UserController = require('../controllers/user.controller');

api.post('/Register', UserController.userRegister);
api.post('/Login', UserController.userLogin);
api.get('/Logout', UserController.userLogout);

// api.post('/create', ArticleController.create);
// api.delete('/remove/:id', ArticleController.remove);
// api.get('/:id', ArticleController.getDetail);
// api.get('', ArticleController.getList);

module.exports = api;