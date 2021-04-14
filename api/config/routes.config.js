const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const usersController = require('../controllers/users.controller');
const reservationController = require('../controllers/reservation.controller');
const notificationsController = require('../controllers/notifications.controller');


const secure = require('../middlewares/secure.middleware');




router.post('/register', usersController.register)   //Postman ok
router.post('/login', usersController.login)         //Postman ok
router.post('/logout', secure.isAuthenticated, usersController.logout)  //Postman ok
router.get('/profile', secure.isAuthenticated , usersController.view)  //Postman ok
router.patch('/profile/update', secure.isAuthenticated , usersController.update)  //Postman ok





router.get('/users', secure.checkRole('admin') , usersController.list)  /* Solo el admin puede acceder a la lista de usuarios*/
router.get('/users/:id', secure.checkRole('admin') , usersController.detail)   /* Solo el admin puede acceder a la lista de usuarios*/



router.get('/events', eventsController.list); //Postman ok
router.post('/events', secure.checkRole('company')  , eventsController.create); //Postman ok
router.get('/events/:id', eventsController.detail); //Postman ok
router.patch('/events/:id', secure.isAuthenticated, eventsController.update); //Postman ok
router.delete('/events/:id', secure.isAuthenticated, eventsController.delete); //Postman ok
// de momento no--> router.put('/events/:id', secure.isAuthenticated, events.update);


router.post('/events/:id/reservations', secure.checkRole('client')  , reservationController.create); //Postman ok
router.get('/reservations', secure.isAuthenticated, reservationController.list);  //Postman ok
router.get('/reservations/:id', secure.isAuthenticated, reservationController.detail);  //Postman ok
router.delete('/reservations/:id', secure.isAuthenticated, reservationController.delete);

router.post('/notifications/notices', notificationsController.createNotice);  //Postman ok
router.post('/notifications/message', secure.isAuthenticated  , notificationsController.createMessage); 



module.exports = router;
