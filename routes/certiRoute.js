const express = require('express');
const router = express.Router();
const Multer = require('multer');
const certiController = require('../controllers/certiController');
const userController = require('../controllers/userController');

const upload = Multer({
    storage: Multer.memoryStorage(),
});

router.post ('/certificate' ,userController.allowIfLoggedin, userController.grantAccess('createAny', 'certificate'), certiController.postCertificate);

router.get('/certificate/:certiId', userController.allowIfLoggedin, userController.grantAccess('readAny', 'certificate'), certiController.getCertificate);

router.get('/certificates', userController.allowIfLoggedin, userController.grantAccess('readAny', 'certificate'), certiController.getCertificates);



module.exports = router;