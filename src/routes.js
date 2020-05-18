const express = require('express');
const celebrateValidator = require('./celebrateValidator');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/signup', celebrateValidator.signup, UserController.create);

module.exports = routes;