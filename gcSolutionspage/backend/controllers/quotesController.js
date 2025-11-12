const Quote = require('../models/Quote');
const jwtMiddleware = require('../middleware/auth'); // Crearemos después

exports.createQuote = [jwtMiddleware, async (req, res) => {
  const { serviceId, message } = req.body;
  try {
    const quote = new Quote({ userId: req.user.id, serviceId, message });
    await quote.save();
    res.status(201).json({ message: 'Cita creada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear cita' });
  }
}];