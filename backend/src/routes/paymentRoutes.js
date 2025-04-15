const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Ruta para crear un pago
router.post('/create', paymentController.createPayment);

// Ruta para obtener estado de un pago
router.get('/status/:id', paymentController.getPaymentStatus);

// Ruta para procesar webhooks
router.post('/webhook', paymentController.processWebhook);

module.exports = router; 