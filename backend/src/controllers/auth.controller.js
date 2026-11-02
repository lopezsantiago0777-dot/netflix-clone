import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const toPublic = (user) => ({
  id: user._id,
  name: user.name,
  lastName: user.lastName,
  email: user.email,
  avatarUrl: user.avatarUrl,
});

export const signUp = async (req, res) => {
  try {
    const { name, lastName, email, password, avatarUrl } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El email ya está registrado' });

    const user = await User.create({ name, lastName, email, password, avatarUrl });
    res.status(201).json({ token: signToken(user), user: toPublic(user) });
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : error.code === 11000 ? 409 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    const valid = user && (await user.comparePassword(password));
    if (!valid) return res.status(401).json({ message: 'Email o contraseña incorrectos' });

    res.status(200).json({ token: signToken(user), user: toPublic(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = (req, res) => {
  res.status(200).json(toPublic(req.user));
};