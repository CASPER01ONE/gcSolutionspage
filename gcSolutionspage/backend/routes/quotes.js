// routes/quotes.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');  // Asumiendo modelo MongoDB
console.log('Cargando routes/quotes.js...');
console.log('Definiendo rutas de quotes...');

// Ruta POST para crear cotización (montada en /api/quotes)
router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos en POST /quotes:', req.body);  // Log para debug
    const newQuote = new Quote(req.body);  // Crea nuevo documento
    await newQuote.save();  // Guarda en MongoDB
    res.status(201).json({ message: 'Cotización enviada exitosamente', data: newQuote });
  } catch (error) {
    console.error('Error en POST /quotes:', error);
    res.status(500).json({ error: 'Error interno: ' + error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();  // Fetch todas las cotizaciones
    res.json(quotes);
  } catch (error) {
    console.error('Error en GET /quotes:', error);
    res.status(500).json({ error: 'Error fetching quotes' });
  }
});

module.exports = router;