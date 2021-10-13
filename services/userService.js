const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const {
  validateEmail,
  validateName,
  validatePassword,
} = require('../middlewares/validationMiddlewares');

const findEmail = async (email) => {
  const emailExistes = await User.findOne({ where: { email } });
  if (emailExistes) {
    return { err: {
      status: 409,
      message: 'User already registered',
    } };
  }
  return false;
};

const createUser = async ({ displayName, email, password, image }) => {
  if (validateName(displayName).err) return validateName(displayName).err;
  if (validateEmail(email).err) return validateEmail(email).err;
  if (validatePassword(password).err) return validatePassword(password).err;
  if (findEmail(email).err) return findEmail(email).err;

  const { id } = await User.create({ displayName, email, password, image });

  const payload = { id, displayName, email };
  const token = jwt.sign({ data: payload }, secret, jwtConfiguration);
  return token;
};

module.exports = {
  createUser,
};