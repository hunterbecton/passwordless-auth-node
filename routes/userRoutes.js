const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/authLogin', authController.sendAuthLink);

router.post('/authVerify/:token', authController.verifyAuthLink);

router.get('/isLoggedIn', authController.isLoggedIn);

// Protected routes
router.use(authController.protect);

router.post('/logout', authController.logout);

router.get('/me', userController.getMe);

router.patch('/updateMe', userController.updateMe);

router.delete('/deleteMe', userController.deleteMe);

// Admin routes
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
