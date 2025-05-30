# LocInd - Sistema de Rastreo Industrial con Google Merchant Center

Este proyecto implementa un sistema web completo para rastreo industrial con integración de pagos mediante Mercado Pago y sincronización automática con Google Merchant Center.

## 🏗️ Estructura del Proyecto

El proyecto está organizado en dos componentes principales:

- **Frontend**: Aplicación web construida con Astro, TypeScript y Tailwind CSS
- **Backend**: API RESTful con Node.js para integración con Mercado Pago y Google Merchant Center

## 🚀 URLs del Sistema en Producción

### **Google Merchant Center:**
- **Feed XML**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml`
- **Feed TXT**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.txt`
- **Estadísticas**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/stats`

### **Dashboard de Administración:**
- **Panel Merchant**: `/admin/merchant-dashboard` (en tu frontend local)

## ⚙️ Funcionalidades Principales

### **✅ Sistema de Productos**
- 4 productos Safeloc configurados (SAFEA-3, SAFEO-3, SAFET-3, SAFES-3)
- Datos completos: precios, imágenes, descripciones, especificaciones
- Archivos MDX con frontmatter estructurado

### **✅ Google Merchant Center**
- Feed XML automático conforme a especificaciones de Google
- Feed TXT alternativo (TSV format)
- Sincronización automática cada hora
- Dashboard de monitoreo en tiempo real
- Estadísticas de catálogo y compliance

### **✅ Procesamiento de Pagos**
- Integración completa con Mercado Pago
- Checkout seguro con CardForm
- Webhook handling para notificaciones
- Soporte para tarjetas y pagos en efectivo

### **✅ Sistema de Carrito**
- Carrito persistente en localStorage
- Cálculo automático de totales
- Interfaz responsiva y moderna

## 🛠️ Requisitos

- Node.js 18.x o superior
- pnpm (para el frontend)
- npm (para el backend)
- Cuenta de Mercado Pago Developers
- Cuenta de Google Merchant Center

## 📋 Configuración

### Obtener Credenciales de Mercado Pago

1. Regístrate en [Mercado Pago Developers](https://www.mercadopago.com.mx/developers)
2. Crea una aplicación nueva en el [Panel de Desarrolladores](https://www.mercadopago.com.mx/developers/panel)
3. Obtén las credenciales:
   - Access Token (para el backend)
   - Public Key (para el frontend)

### Variables de Entorno

#### Backend (.env)

```env
# Credenciales de Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
MERCADOPAGO_PUBLIC_KEY=your_public_key_here

# Configuración del servidor
PORT=3000
NODE_ENV=production

# URL del frontend (para CORS y Google Merchant)
FRONTEND_URL=https://localizacion-industrial.com

# URL base para webhooks (cambiar en producción)
WEBHOOK_URL=https://locind-backend-api-e2da701e559b.herokuapp.com/api/webhook

# Google Merchant Center
GOOGLE_MERCHANT_FEED_TITLE="LocInd - Productos Industriales Safeloc"
GOOGLE_MERCHANT_FEED_DESCRIPTION="Catálogo de productos de localización industrial"
```

#### Frontend (.env)

```env
PUBLIC_API_BASE_URL=https://locind-backend-api-e2da701e559b.herokuapp.com
PUBLIC_MERCADO_PAGO_PUBLIC_KEY=your_public_key_here
PUBLIC_DEV_MODE=false
```

## 🚀 Instalación y Deployment

### Desarrollo Local

```bash
# Frontend
cd frontend
pnpm install
pnpm dev

# Backend
cd backend
npm install
npm run dev
```

### Deployment en Producción

#### Backend (Heroku)

```bash
cd backend

# Login a Heroku
heroku login

# Crear app (si es primera vez)
heroku create locind-backend-api

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://localizacion-industrial.com
heroku config:set MERCADOPAGO_ACCESS_TOKEN=tu_access_token_real
heroku config:set MERCADOPAGO_PUBLIC_KEY=tu_public_key_real

# Deploy
git add .
git commit -m "Deploy backend con Google Merchant Center"
git push heroku main
```

#### Frontend

El frontend puede ser desplegado en cualquier servicio de hosting estático como Netlify, Vercel o GitHub Pages.

## 🔄 Google Merchant Center - Configuración

### **1. Crear Feed en Google Merchant Center**

1. Ve a [Google Merchant Center](https://merchants.google.com)
2. Ir a **"Products" > "Feeds"**
3. **Crear nuevo feed:**
   - Nombre: "LocInd Productos Safeloc"
   - País: México
   - Idioma: Español
   - Método: "Scheduled fetch"
   - URL: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml`
   - Frecuencia: Diaria

### **2. Validación y Monitoreo**

- **Dashboard de administración**: Ve a `/admin/merchant-dashboard` en tu frontend
- **Validación manual**: Abre la URL del feed para verificar funcionamiento
- **Estadísticas**: Revisa `/api/merchant/stats` para métricas del catálogo

### **3. Datos de Productos**

#### **✅ Completos:**
- ID, título, descripción
- Precios en MXN
- Disponibilidad
- Imágenes
- Marca (Safeloc)
- Condición (nuevo)

#### **⚠️ Pendientes:**
- Códigos GTIN (llegará la próxima semana del fabricante)
- URLs completas del frontend

## 💳 Integración de Mercado Pago

### Flujo de Procesamiento de Pagos

1. Cliente agrega productos al carrito
2. Procede al checkout
3. Formulario de pago de Mercado Pago
4. Backend procesa el pago
5. Respuesta y redirección al cliente

### Estructura de Archivos de Integración

- **Backend**:
  - `src/config/mercadoPago.js` - Configuración
  - `src/controllers/paymentController.js` - Procesamiento de pagos
  - `src/routes/paymentRoutes.js` - Rutas API

- **Frontend**:
  - `src/components/Payment/PaymentForm.astro` - Formulario de pago
  - `src/utils/mercadoPago.js` - Utilidades de API
  - `src/pages/checkout.astro` - Página de checkout

### Webhooks

Mercado Pago envía notificaciones a: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/webhook`

Configurar en [Panel de Desarrolladores](https://www.mercadopago.com.mx/developers/panel) con eventos:
- `payment.created`
- `payment.updated`

## 🧪 Testing

### Tarjetas de Prueba

- **VISA**: 4509 9535 6623 3704
- **MASTERCARD**: 5031 7557 3453 0604
- **AMERICAN EXPRESS**: 3711 803032 57522

**Códigos de seguridad**: cualquier número de 3-4 dígitos  
**Fecha de expiración**: cualquier fecha futura  

### Escenarios de Prueba

- `APRO`: Pago aprobado
- `CONT`: Pago pendiente
- `OTHE`: Rechazo general
- `CALL`: Rechazo con validación

## 🔧 Solución de Problemas

### Errores Comunes

- **Error 400**: Verificar credenciales de Mercado Pago
- **Error 401**: Token de acceso expirado
- **CORS Error**: Verificar dominio en `allowedOrigins`
- **Google Merchant Error**: Verificar formato XML del feed

### Logs y Depuración

```bash
# Logs de Heroku
heroku logs --app locind-backend-api

# Logs de frontend
pnpm dev # Revisar consola del navegador
```

## 📊 Monitoreo

### URLs de Verificación

- **Health Check**: `https://locind-backend-api-e2da701e559b.herokuapp.com/health`
- **Feed XML**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml`
- **Estadísticas**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/stats`

### Dashboard de Google Merchant

Ve el dashboard de administración en tu frontend local: `/admin/merchant-dashboard`

## 🔗 Recursos

- [Documentación de Mercado Pago](https://www.mercadopago.com.mx/developers/es/docs)
- [Google Merchant Center Help](https://support.google.com/merchants)
- [Feed Specification](https://support.google.com/merchants/answer/7052112)
- [Estado del Sistema](https://status.mercadopago.com/)

## 📅 Próximos Pasos

### **Esta Semana:**
- ✅ Backend deployado y funcionando
- ✅ Feed XML automático generándose
- ⏳ Verificar y reclamar dominio en Google Merchant
- ⏳ Crear primer feed en Google Merchant

### **Próxima Semana:**
- 🔄 Agregar códigos GTIN reales del fabricante
- 🔄 Completar configuración de Google Merchant
- 🔄 Primera sincronización de productos
- 🔄 Monitoreo y optimización

## 📄 Licencia

Este proyecto está bajo licencia MIT. 