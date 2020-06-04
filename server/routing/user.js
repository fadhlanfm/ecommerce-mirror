const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/resetpassword', UserController.resetPassword);

module.exports = router;