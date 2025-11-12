const Service = require('../models/Service');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

exports.getServices = async (req, res) => {
  // Si la conexión no está lista, devolvemos sample inmediatamente
  if (mongoose.connection.readyState !== 1) {
    try {
      const dataPath = path.join(__dirname, '..', 'data', 'services.sample.json');
      const raw = fs.readFileSync(dataPath, 'utf-8');
      const sample = JSON.parse(raw);
      res.set('X-Data-Source', 'sample');
      return res.status(200).json(sample);
    } catch (e) {
      console.error('Error cargando datos de ejemplo:', e?.message || e);
      res.set('X-Data-Source', 'none');
      return res.status(200).json([]);
    }
  }

  try {
    const services = await Service.find();
    res.set('X-Data-Source', 'db');
    res.json(services);
  } catch (err) {
    console.error('Error al obtener servicios:', err?.message || err);
    try {
      const dataPath = path.join(__dirname, '..', 'data', 'services.sample.json');
      const raw = fs.readFileSync(dataPath, 'utf-8');
      const sample = JSON.parse(raw);
      res.set('X-Data-Source', 'sample');
      res.status(200).json(sample);
    } catch (e) {
      console.error('Error cargando datos de ejemplo:', e?.message || e);
      res.set('X-Data-Source', 'none');
      res.status(200).json([]);
    }
  }
};