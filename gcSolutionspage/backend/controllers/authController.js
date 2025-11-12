const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Faltan campos' });
  try {
    const hashedPw = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPw });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error en registro' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en login' });
  }
};