// scripts/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('../models/Service');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI no definido en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB para seed');

    const samples = [
      { name: 'Seguro Patrimonial', description: 'Protección integral de tu patrimonio.', price: 1200 },
      { name: 'Gastos Médicos', description: 'Cobertura amplia de gastos médicos.', price: 900 },
      { name: 'Beca Educativa', description: 'Plan de ahorro y protección educativa.', price: 700 },
    ];

    for (const s of samples) {
      await Service.updateOne({ name: s.name }, { $set: s }, { upsert: true });
    }

    const count = await Service.countDocuments();
    console.log(`Seed completado. Total de servicios: ${count}`);
  } catch (err) {
    console.error('Error en seed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();