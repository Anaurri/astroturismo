const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const eventsController = require('../controllers/events.controller');
const usersController = require('../controllers/users.controller');
const reservationController = require('../controllers/reservation.controller');
const notificationsController = require('../controllers/notifications.controller');
const upload = require('../config/multer.config')


const secure = require('../middlewares/secure.middleware');




router.post('/register', usersController.register)   //Postman ok
router.post('/login', usersController.login)         //Postman ok
router.post('/logout', secure.isAuthenticated, usersController.logout)  //Postman ok
router.get('/profile', secure.isAuthenticated, usersController.view)  //Postman ok
router.patch('/profile/update', secure.isAuthenticated, upload.single('avatar'), usersController.update)  //Postman ok

router.get('/users', secure.checkRole('admin'), usersController.list) //Postman ok /* Solo el admin puede acceder a la lista de usuarios*/
router.get('/users/:id', secure.checkRole('admin'), usersController.detail) //Postman ok  /* Solo el admin puede acceder a la lista de usuarios*/

router.get('/events', eventsController.list); //Postman ok
router.get('/events/:id', eventsController.detail); //Postman ok
router.post('/events', secure.checkRole('company'), upload.single('image'), eventsController.create); //Postman ok
router.patch('/events/:id', secure.isAuthenticated, upload.single('image'), eventsController.update); //Postman ok
router.delete('/events/:id', secure.isAuthenticated, eventsController.delete); //Postman ok

router.post('/events/:id/reservations', secure.checkRole('client'), reservationController.create); //Postman ok
router.get('/reservations', secure.isAuthenticated, reservationController.list);  //Postman ok
router.get('/reservations/:id', secure.isAuthenticated, reservationController.detail);  //Postman ok
router.delete('/reservations/:id', secure.isAuthenticated, reservationController.delete);

router.post('/notifications/notices', notificationsController.createNotice);  //Postman ok
router.post('/notifications/message', secure.isAuthenticated, notificationsController.createMessage); //Postman ok
router.get('/notifications/me', secure.isAuthenticated, notificationsController.list);  //Postman ok



/*Handel errors*/
router.use((req, res, next)=>{
    next(createError(404, 'Route not found'))
})
module.exports = router;
