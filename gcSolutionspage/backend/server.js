const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Configuración de CORS (desarrollo + producción)
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS no permitido para este origen'));
  },
}));

// Health check
app.get('/', (req, res) => res.send('Servidor OK'));

// Ruta simple para portada
app.get('/api/home', (req, res) => {
  res.json({ message: 'Bienvenido a GC Solutions', featured: 'Seguros y más' });
});

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error en MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));