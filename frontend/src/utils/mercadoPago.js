/**
 * Utilidades para la integración con Mercado Pago
 * Basado en la documentación oficial: https://www.mercadopago.com.mx/developers/es/docs/checkout-api/integration-configuration/card/integrate-via-cardform
 */

// URL base para las llamadas a la API de backend
export const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'https://tu-app-backend.herokuapp.com';

// Clave pública de Mercado Pago
export const MERCADO_PAGO_PUBLIC_KEY = import.meta.env.PUBLIC_MERCADO_PAGO_PUBLIC_KEY || '';

/**
 * Carga el SDK de Mercado Pago de manera asíncrona
 * @returns {Promise<any>} - El objeto MercadoPago
 */
export async function loadMercadoPagoSDK() {
  // Si ya está cargado, devolver la instancia existente
  if (typeof window.MercadoPago !== 'undefined') {
    return window.MercadoPago;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      if (typeof window.MercadoPago !== 'undefined') {
        resolve(window.MercadoPago);
      } else {
        reject(new Error('No se pudo cargar el SDK de Mercado Pago'));
      }
    };
    script.onerror = () => {
      reject(new Error('Error al cargar el SDK de Mercado Pago'));
    };
    document.body.appendChild(script);
  });
}

/**
 * Inicializa una instancia de Mercado Pago con la clave pública
 * @returns {object|null} - La instancia de Mercado Pago o null si hay un error
 */
export function initMercadoPago() {
  if (!MERCADO_PAGO_PUBLIC_KEY) {
    console.error('La clave pública de Mercado Pago no está configurada');
    return null;
  }

  try {
    return new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY);
  } catch (error) {
    console.error('Error al inicializar Mercado Pago:', error);
    return null;
  }
}

/**
 * Procesa un pago con la API de backend
 * @param {object} paymentData - Los datos del pago
 * @returns {Promise<object>} - La respuesta del servidor
 */
export async function processPayment(paymentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la respuesta del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    throw error;
  }
}

/**
 * Consulta el estado de un pago
 * @param {string} paymentId - El ID del pago
 * @returns {Promise<object>} - La respuesta del servidor
 */
export async function getPaymentStatus(paymentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/status/${paymentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al consultar el estado del pago');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al consultar el estado del pago:', error);
    throw error;
  }
}

/**
 * Códigos de estado de Mercado Pago
 */
export const PAYMENT_STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected'
};

/**
 * Detalles de estado de Mercado Pago
 */
export const PAYMENT_STATUS_DETAIL = {
  ACCREDITED: 'accredited',
  PENDING_CONTINGENCY: 'pending_contingency',
  PENDING_WAITING_PAYMENT: 'pending_waiting_payment',
  REJECTED_CALL_FOR_AUTHORIZE: 'cc_rejected_call_for_authorize',
  REJECTED_INSUFFICIENT_AMOUNT: 'cc_rejected_insufficient_amount',
  REJECTED_BAD_FILLED_DATE: 'cc_rejected_bad_filled_date',
  REJECTED_BAD_FILLED_SECURITY_CODE: 'cc_rejected_bad_filled_security_code',
  REJECTED_OTHER: 'cc_rejected_other'
}; 