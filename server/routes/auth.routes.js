const router = require('express').Router();
const authController = require('../controllers/authController');

router
    .route('/registration')
    .post(authController.registration);

router
    .route('/authorization')
    .post(authController.authorization);

module.exports = router;
