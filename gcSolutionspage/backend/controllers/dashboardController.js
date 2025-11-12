const Quote = require('../models/Quote');
const jwtMiddleware = require('../middleware/auth');

exports.getDashboard = [jwtMiddleware, async (req, res) => {
  try {
    const quotes = await Quote.find({ userId: req.user.id }).populate('serviceId');
    res.json({ user: req.user, quotes });
  } catch (err) {
    res.status(500).json({ message: 'Error en dashboard' });
  }
}];