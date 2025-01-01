const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile/:id', authController.getProfile);
router.put('/profile/:id', authController.updateProfile);
router.delete('/profile/:id', authController.deleteUser);

module.exports = router;
