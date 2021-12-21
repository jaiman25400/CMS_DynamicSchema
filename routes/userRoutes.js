const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/authUser');

router.get('/all', userController.getAllUsers);

router.post('/register', userController.createUser);

router.post('/login', auth.authUser);

router.get('/profile', auth.protect, userController.getUserProfile);

router.put('/update/:userId', userController.updateUser);

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;