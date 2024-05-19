import UserModel from '../db/users.model.js';
import bcrypt from 'bcrypt';

export const createUser = async ({ email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  return UserModel.create({
    email,
    password: hashPassword,
  });
};

export const updateUserById = (id, updatePayload) => {
  return UserModel.updateOne({ _id: id }, updatePayload);
};
