const { MercadoPagoConfig } = require('mercadopago');

// Configuración de MercadoPago
const mercadopagoConfig = () => {
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is required in environment variables');
  }
  
  return new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
  });
};

module.exports = {
  mercadopagoConfig,
  PUBLIC_KEY: process.env.MERCADOPAGO_PUBLIC_KEY
}; 