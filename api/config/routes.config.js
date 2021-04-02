const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const usersController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.middleware');




router.post('/register', usersController.register) 
router.post('/login', usersController.login) 
router.post('/logout', secure.isAuthenticated, usersController.logout) 

router.get('/users', secure.checkRole('admin') , usersController.list) /* Solo el admin puede acceder a la lista de usuarios*/
router.get('/users/:id', secure.checkRole('admin') , usersController.detail) /* Solo el admin puede acceder a la lista de usuarios*/


router.get('/events', eventsController.list);
router.post('/events', secure.checkRole('company')  , eventsController.create);
router.get('/events/:id', eventsController.get);
router.delete('/events/:id', secure.isAuthenticated, eventsController.delete);
// de momento no--> router.put('/events/:id', secure.isAuthenticated, events.update);


module.exports = router;
