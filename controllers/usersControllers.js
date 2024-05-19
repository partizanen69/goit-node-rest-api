import UserModel from '../db/users.model.js';
import toHttpError from '../helpers/HttpError.js';
import { compareHash, createToken } from '../helpers/auth.js';
import { createUser, updateUserById } from '../services/usersServices.js';
import { toController } from '../utils/api.js';

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(409).json({
      message: 'Email in use',
    });
    return;
  }

  const newUser = await createUser({ email, password });
  const { password: _, ...userWithoutPassword } = newUser.toObject();

  res.status(200).json({ user: userWithoutPassword });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw toHttpError(401, 'Email or password invalid');
  }

  const isSamePassword = await compareHash(password, user.password);
  if (!isSamePassword) {
    throw toHttpError(401, 'Email or password invalid');
  }

  const token = createToken({
    id: user._id,
  });
  await updateUserById(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (req, res) => {
  const user = req.user;
  await updateUserById(user.id, { token: null });
  res.status(204).send();
};

const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

export default {
  registerUser: toController(registerUser),
  loginUser: toController(loginUser),
  logoutUser: toController(logoutUser),
  getCurrentUser: toController(getCurrentUser),
};
