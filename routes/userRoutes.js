const express = require('express');
const userController = require('./../controllers/userController');

// create new Router and save this to new variable tourRouter
const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;