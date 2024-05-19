import express from 'express';
import validateBody from '../helpers/middlewares/validateBody.js';
import userControllers from '../controllers/usersControllers.js';
import { registerUserSchema } from '../schemas/usersSchemas.js';
import authenticate from '../helpers/middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(registerUserSchema),
  userControllers.registerUser
);

usersRouter.post(
  '/login',
  validateBody(registerUserSchema),
  userControllers.loginUser
);

usersRouter.post('/logout', authenticate, userControllers.logoutUser);

usersRouter.get('/current', authenticate, userControllers.getCurrentUser);

export default usersRouter;
