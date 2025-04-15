# LocInd - Sistema de Rastreo Industrial con Procesamiento de Pagos

Este proyecto implementa un sistema web para rastreo industrial con integración de pagos mediante Mercado Pago.

## Estructura del Proyecto

El proyecto está organizado en dos componentes principales:

- **Frontend**: Aplicación web construida con Astro, TypeScript y Tailwind CSS
- **Backend**: API RESTful con Node.js para la integración con Mercado Pago

## Requisitos

- Node.js 18.x o superior
- pnpm (para el frontend)
- npm (para el backend)
- Cuenta de Mercado Pago Developers

## Configuración

### Obtener Credenciales de Mercado Pago

1. Regístrate en [Mercado Pago Developers](https://www.mercadopago.com.mx/developers)
2. Crea una aplicación nueva en el [Panel de Desarrolladores](https://www.mercadopago.com.mx/developers/panel)
3. Obtén las credenciales:
   - Access Token (para el backend)
   - Public Key (para el frontend)

### Variables de Entorno

#### Backend (.env)

```
# Credenciales de Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
MERCADOPAGO_PUBLIC_KEY=your_public_key_here

# Configuración del servidor
PORT=3000

# URL del frontend (para CORS)
FRONTEND_URL=https://tu-dominio-frontend.com

# URL base para webhooks (cambiar en producción)
WEBHOOK_URL=https://tu-app-backend.herokuapp.com/api/webhook
```

#### Frontend (.env)

```
PUBLIC_API_BASE_URL=https://tu-app-backend.herokuapp.com
PUBLIC_MERCADO_PAGO_PUBLIC_KEY=your_public_key_here
PUBLIC_DEV_MODE=false
```

## Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Despliegue

### Backend (Heroku)

1. Crear una aplicación en Heroku
2. Configurar las variables de entorno en Heroku:
   ```bash
   heroku config:set MERCADOPAGO_ACCESS_TOKEN=your_access_token
   heroku config:set MERCADOPAGO_PUBLIC_KEY=your_public_key
   heroku config:set FRONTEND_URL=https://tu-dominio-frontend.com
   ```
3. Desplegar el backend:
   ```bash
   cd backend
   heroku git:remote -a your-app-name
   git subtree push --prefix backend heroku main
   ```

### Frontend

El frontend puede ser desplegado en cualquier servicio de hosting estático como Netlify, Vercel o GitHub Pages.

## Integración de Mercado Pago

La integración con Mercado Pago se realiza siguiendo la [documentación oficial de Checkout API](https://www.mercadopago.com.mx/developers/es/docs/checkout-api/integration-configuration/card/integrate-via-cardform).

### Flujo de Procesamiento de Pagos

1. El cliente agrega productos al carrito
2. El cliente procede al checkout
3. Se muestra el formulario de pago de Mercado Pago
4. El cliente ingresa los datos de la tarjeta
5. El formulario envía los datos al backend
6. El backend procesa el pago con Mercado Pago
7. Mercado Pago responde con el estado del pago
8. El backend notifica al frontend sobre el resultado
9. El cliente es redirigido a una página de éxito o error

### Estructura de Archivos de Integración

- **Backend**:
  - `src/config/mercadoPago.js` - Configuración de Mercado Pago
  - `src/controllers/paymentController.js` - Controlador para procesar pagos
  - `src/routes/paymentRoutes.js` - Rutas de la API para pagos

- **Frontend**:
  - `src/components/Payment/PaymentForm.astro` - Formulario de pago
  - `src/utils/mercadoPago.js` - Utilidades para interactuar con la API
  - `src/pages/checkout.astro` - Página de checkout
  - `src/pages/pago-exitoso.astro` - Página de confirmación

## Webhooks

Mercado Pago enviará notificaciones a través de webhooks cuando el estado de un pago cambie. Estos webhooks se manejan en el endpoint `/api/webhook` del backend.

Para configurar los webhooks:

1. Accede al [Panel de Desarrolladores](https://www.mercadopago.com.mx/developers/panel)
2. Selecciona tu aplicación
3. Ve a "Webhooks"
4. Agrega una nueva URL: `https://tu-app-backend.herokuapp.com/api/webhook`
5. Selecciona los eventos `payment.created`, `payment.updated`

## Testing

Para probar la integración, Mercado Pago proporciona tarjetas de prueba:

- **VISA**: 4509 9535 6623 3704
- **MASTERCARD**: 5031 7557 3453 0604
- **AMERICAN EXPRESS**: 3711 803032 57522

Código de seguridad: cualquier número de 3 o 4 dígitos  
Fecha de expiración: cualquier fecha futura  
Titular: APRO (para pagos aprobados)

Para probar diferentes escenarios, puedes usar estos nombres de titulares:
- `APRO`: Pago aprobado
- `CONT`: Pago pendiente
- `OTHE`: Rechazo general
- `CALL`: Rechazo con validación
- `FUND`: Rechazo por monto insuficiente
- `SECU`: Rechazo por código de seguridad
- `EXPI`: Rechazo por fecha de expiración
- `FORM`: Rechazo por error en formulario

## Solución de Problemas

- **Error 400**: Verifica que las credenciales de Mercado Pago sean correctas
- **Error 401**: El token de acceso ha expirado o es inválido
- **CORS Error**: Asegúrate de que el dominio de tu frontend esté en la lista de orígenes permitidos
- **Webhook no recibido**: Verifica la URL del webhook en la configuración de Mercado Pago

### Logs y Depuración

- **Backend**: Los logs de transacciones se registran en la consola
- **Frontend**: Revisa la pestaña Network en las herramientas de desarrollo

## Recursos

- [Documentación de Mercado Pago](https://www.mercadopago.com.mx/developers/es/docs)
- [Referencia API](https://www.mercadopago.com.mx/developers/es/reference)
- [Estado del Sistema de Mercado Pago](https://www.mercadopago.com.mx/developers/es/docs/checkout-api/integration-configuration/card/integrate-via-cardform)

## Licencia

Este proyecto está bajo licencia MIT. 