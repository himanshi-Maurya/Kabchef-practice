const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController');

router.post ('/article' ,userController.allowIfLoggedin, userController.grantAccess('createAny', 'article'), articleController.postArticle);

router.get('/article/:userId', userController.allowIfLoggedin, articleController.getArticle);

router.get('/articles', userController.allowIfLoggedin,  articleController.getArticles);

router.put('/article/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'article'), articleController.updateArticle);

router.delete('/article/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'article'), articleController.deleteArticle);

module.exports = router;