const express = require('express');
const celebrateValidator = require('./config/celebrateValidator');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const TasksController = require('./controllers/TasksController');

const passport = require('./config/passport');

const routes = express.Router();

routes.post('/signup', celebrateValidator.signup, UserController.create);
routes.post('/signin', celebrateValidator.signin, SessionController.create);

routes.use(passport.authenticate());

routes.get('/tasks', TasksController.index);
routes.post('/tasks', TasksController.create);
routes.delete('/tasks/:id', TasksController.delete);
routes.put('/tasks/:id/toggle', TasksController.update);

module.exports = routes;