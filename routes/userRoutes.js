const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

// create new Router and save this to new variable tourRouter
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// only receive email address
router.post('/forgotPassword', authController.forgotPassword);
// receive token as well as new password
router.patch('/resetPassword/:token', authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
