const express = require('express');
const multer = require('multer');
const path = require('path')
const fs = require('fs');

const router = express.Router();

const publicFolderPath = path.resolve(__dirname, '..', 'public'); 
const imageFolderPath = path.join(publicFolderPath, 'img');
const audioFolderPath=path.join(publicFolderPath,'audio');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageFolderPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine})

const aufileStorageEngine =multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, audioFolderPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const post = multer({storage:aufileStorageEngine})

// Controller 
const registrationController = require('../controllers/registrationController.js');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const podcastController = require('../controllers/podcastController.js');
const beginController = require('../controllers/beginController');
const userController = require('../controllers/userController.js');
const SearchController = require('../controllers/searchController.js');

//  Middleware
router.get('/', loginController.isLoggedOut, beginController.showBegin)
router.get('/login', loginController.isLoggedOut ,loginController.showLoginPage);
router.post('/login', loginController.login);

router.get('/signup', registrationController.showRegisterForm);
router.post('/signup', registrationController.createUsers);

router.get('/home', loginController.isLoggedIn, homeController.showHome);
router.post('/home/:userId/addLike/:podcastId', loginController.isLoggedIn, podcastController.addLike);
router.get('/search', loginController.isLoggedIn, SearchController.search)
router.get('/home/podcasts', podcastController.getPodcastById)
//router.get('/home/:podcastId')

router.get('/profile/:userId', loginController.isLoggedIn, userController.showProfilePage)
router.post('/update', loginController.isLoggedIn, upload.single('photoo'), userController.updateProfile)
router.post('/post', loginController.isLoggedIn, post.fields([{name:'podcast',maxCount:1},{name:'photo',maxCount:1}]), podcastController.createPodcast)

router.get('/logout', loginController.logout);

module.exports = router;