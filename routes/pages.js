const express = require('express');


const router = express.Router();

// Controller 
const registrationController = require('../controllers/registrationController.js');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
//  Middleware
router.get('/login', loginController.isLoggedOut ,loginController.showLoginPage);
router.post('/login', loginController.login);
//  Show Registration Page
router.get('/signup', registrationController.showRegisterForm);
//  Handle Sign Up Logic
router.post('/signup', registrationController.createUsers);

router.get('/home', loginController.isLoggedIn ,homeController.showHome);
router.post('/logout', loginController.logout);

module.exports = router;