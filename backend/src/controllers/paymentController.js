const { mercadopagoConfig } = require('../config/mercadoPago');
const { Payment } = require('mercadopago');
const crypto = require('crypto');

// Controlador para crear un pago
exports.createPayment = async (req, res, next) => {
  try {
    const { 
      transaction_amount, 
      token, 
      description, 
      installments, 
      payment_method_id, 
      issuer_id, 
      payer 
    } = req.body;
    
    // Validación básica
    if (!transaction_amount || !token || !payment_method_id || !payer.email) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan datos requeridos para procesar el pago'
      });
    }

    const client = new Payment(mercadopagoConfig());
    
    // Crear el pago
    const paymentData = {
      body: {
        transaction_amount: Number(transaction_amount),
        token,
        description,
        installments: Number(installments),
        payment_method_id,
        issuer_id: issuer_id || undefined,
        payer: {
          email: payer.email,
          identification: payer.identification ? {
            type: payer.identification.type,
            number: payer.identification.number
          } : undefined
        }
      },
      requestOptions: { 
        idempotencyKey: crypto.randomUUID() 
      }
    };

    const payment = await client.create(paymentData);
    
    // Registrar la transacción
    console.log(`Pago creado: ID ${payment.id}, Estado: ${payment.status}`);
    
    // Respuesta exitosa
    return res.status(201).json({
      status: 'success',
      data: payment
    });

  } catch (error) {
    console.error('Error al crear pago:', error);
    
    // Respuesta con error detallado
    return res.status(400).json({
      status: 'error',
      message: error.message || 'Error al procesar el pago',
      error: error.cause || {}
    });
  }
};

// Controlador para obtener el estado de un pago
exports.getPaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Se requiere ID del pago'
      });
    }

    const client = new Payment(mercadopagoConfig());
    const payment = await client.get({ id });
    
    return res.status(200).json({
      status: 'success',
      data: payment
    });

  } catch (error) {
    console.error('Error al obtener estado del pago:', error);
    return res.status(400).json({
      status: 'error',
      message: error.message || 'Error al obtener estado del pago',
      error: error.cause || {}
    });
  }
};

// Controlador para procesar notificaciones de webhook
exports.processWebhook = async (req, res, next) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      const client = new Payment(mercadopagoConfig());
      const payment = await client.get({ id: paymentId });
      
      // Información sobre el pago recibido
      console.log(`Webhook de pago recibido: ID ${paymentId}, Estado: ${payment.status}`);
      
      // Aquí implementarías la lógica para actualizar tu base de datos
      // Ejemplo: actualizarEstadoOrden(payment.external_reference, payment.status);
    }
    
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error al procesar webhook:', error);
    return res.status(400).json({
      status: 'error',
      message: error.message || 'Error al procesar webhook'
    });
  }
}; 