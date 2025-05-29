const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const paymentRoutes = require('./routes/paymentRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
require('dotenv').config();

const app = express();

// Configuración de CORS para permitir solicitudes desde el frontend
const allowedOrigins = [
  'http://localhost:3000',          // Frontend en desarrollo local
  'http://localhost:4321',          // Frontend Astro en desarrollo local
  'http://localhost:80',            // Frontend en Docker local
  'http://localhost',               // Frontend en Docker local (puerto 80 implícito)
  'http://127.0.0.1:80',            // Alternativa localhost
  'http://127.0.0.1',               // Alternativa localhost (puerto 80 implícito)
  'http://frontend',                // Nombre del servicio en Docker
  'https://tu-app-frontend.com',    // Dominio de producción (reemplaza con tu dominio real)
  process.env.FRONTEND_URL          // URL del frontend desde variables de entorno
].filter(Boolean); // Elimina los valores falsy (undefined, null, etc.)

// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    // En desarrollo, permitir todas las solicitudes (esto facilita la depuración)
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.warn(`Solicitud CORS bloqueada desde el origen: ${origin}`);
      const msg = 'La política CORS para este sitio no permite acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/merchant', merchantRoutes);

// Webhook route for MercadoPago notifications
app.post('/api/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  // Process webhook notification
  res.status(200).send('OK');
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('Backend is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 