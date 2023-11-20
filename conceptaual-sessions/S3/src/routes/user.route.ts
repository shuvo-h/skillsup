import express from 'express';
import { userController } from '../controllers/user.controller';

const userRoutes = express.Router();

// Create a new user
userRoutes.route('/create-user')
    .post( userController.createUser);

// Get all users
userRoutes.route('/')
    .get( userController.getAllUser);

// Get a single user, update a user, or delete a user
userRoutes
  .route('/:id')
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export { userRoutes };
