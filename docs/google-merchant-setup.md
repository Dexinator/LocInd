# Configuración de Google Merchant Center para LocInd

## **Fase 1: Configuración Inicial**

### **1.1 Crear Cuenta de Google Merchant Center**

1. **Ir a [Google Merchant Center](https://www.google.com/retail/solutions/merchant-center/)**
2. **Hacer clic en "Comenzar"**
3. **Configurar información del negocio:**
   ```
   Nombre del negocio: LocInd
   País: México
   Zona horaria: America/Mexico_City
   Moneda: MXN (Peso Mexicano)
   ```

### **1.2 Verificar y Reclamar Sitio Web**

1. **Agregar dominio del sitio web:**
   - URL: `https://locind.com` (reemplazar con tu dominio real)
   - Método de verificación recomendado: **HTML Tag**

2. **Agregar HTML Tag al frontend:**
   ```astro
   <!-- En frontend/src/layouts/BaseLayout.astro -->
   <meta name="google-site-verification" content="TU_CODIGO_AQUI" />
   ```

### **1.3 Configurar Información Fiscal y Envío**

#### **Configuración Fiscal (México)**
```
País de venta: México
Incluir IVA en precios: Sí (16%)
Configuración fiscal: Para empresas mexicanas
```

#### **Configuración de Envío**
```
Zona de envío: México
Método de envío: Estándar
Costo de envío: Calculado por peso/tamaño
Tiempo de procesamiento: 1-2 días hábiles
Tiempo de entrega: 3-7 días hábiles
```

## **Fase 2: Configuración del Feed de Productos**

### **2.1 Crear Data Source**

1. **Ir a "Productos" > "Feeds"**
2. **Hacer clic en "+" para agregar nuevo feed**
3. **Configurar parámetros:**
   ```
   País de destino: México
   Idioma: Español
   Moneda: MXN
   Nombre del feed: "LocInd - Productos Safeloc"
   ```

### **2.2 Configurar Método de Envío**

**Opción 1: Scheduled Fetch (Recomendado)**
```
Método: Scheduled Fetch
URL del feed: https://tu-backend.herokuapp.com/api/merchant/feed.xml
Frecuencia: Diaria a las 3:00 AM
Formato: XML RSS
```

**Opción 2: Upload Manual**
```
Método: Upload
Archivo: Subir archivo XML/TXT generado
Frecuencia: Manual cuando haya cambios
```

### **2.3 URLs de los Feeds**

#### **Feed XML (Recomendado para Google)**
```
https://tu-backend.herokuapp.com/api/merchant/feed.xml
```

#### **Feed TXT (Alternativo)**
```
https://tu-backend.herokuapp.com/api/merchant/feed.txt
```

#### **Estadísticas del Feed**
```
https://tu-backend.herokuapp.com/api/merchant/stats
```

## **Fase 3: Configuración de Políticas y Compliance**

### **3.1 Políticas de Devolución**

Agregar a tu sitio web (página de políticas):

```html
Política de Devoluciones LocInd:
- Plazo: 30 días naturales
- Condición: Producto sin usar, en empaque original
- Proceso: Contactar soporte@locind.com
- Costo de envío de devolución: A cargo del cliente
- Reembolso: 5-10 días hábiles tras recepción
```

### **3.2 Términos y Condiciones**

Elementos requeridos en T&C:
- Información de contacto completa
- Políticas de privacidad y datos
- Términos de venta y garantías
- Información de envío y entrega
- Proceso de devoluciones y reembolsos

### **3.3 Página de Contacto**

Información requerida:
```
Dirección física: [Tu dirección comercial]
Teléfono: [Tu número de teléfono]
Email: soporte@locind.com
Horarios de atención: Lunes a Viernes 9:00-18:00
```

## **Fase 4: Optimización y Monitoreo**

### **4.1 Atributos Importantes para B2B**

Para productos industriales como los de Safeloc:

```xml
<g:custom_label_0>UWB Technology</g:custom_label_0>
<g:custom_label_1>Industrial IoT</g:custom_label_1>
<g:custom_label_2>Precision Tracking</g:custom_label_2>
<g:custom_label_3>Industry 4.0</g:custom_label_3>
```

### **4.2 Descripciones Optimizadas**

Formato recomendado para productos técnicos:
```
[Marca] [Modelo] - [Función Principal]

Características clave:
• [Característica 1]
• [Característica 2]
• [Característica 3]

Aplicaciones:
- [Uso 1]
- [Uso 2]

Especificaciones técnicas: [Breve resumen]
```

### **4.3 Monitoreo de Performance**

#### **Métricas Clave a Seguir:**
- **Tasa de aprobación de productos**: >95%
- **Impresiones**: Productos mostrados en búsquedas
- **Clics**: Tráfico generado desde Google Shopping
- **CTR**: Click-through rate (objetivo: >1%)
- **Conversiones**: Ventas atribuidas a Google Shopping

#### **Herramientas de Monitoreo:**
1. **Google Merchant Center Dashboard**
2. **Google Analytics 4** (configurar Enhanced Ecommerce)
3. **Google Ads** (si se ejecutan campañas de pago)

## **Fase 5: Resolución de Problemas Comunes**

### **5.1 Productos Rechazados**

**Errores Frecuentes:**
- `Missing GTIN`: Agregar códigos de barras válidos
- `Invalid price`: Verificar formato de precios (con MXN)
- `Landing page crawl error`: Verificar accesibilidad de URLs
- `Image crawl error`: Verificar que imágenes sean públicas

### **5.2 Validación del Feed**

**Comando para probar el feed localmente:**
```bash
cd backend
node scripts/update-products-for-merchant.js
```

**Verificar feed en navegador:**
```
http://localhost:3000/api/merchant/feed.xml
http://localhost:3000/api/merchant/stats
```

## **Fase 6: Lanzamiento y Optimización**

### **6.1 Checklist de Lanzamiento**

- [ ] Cuenta de Merchant Center creada y verificada
- [ ] Sitio web verificado y reclamado
- [ ] Feed configurado y funcionando
- [ ] Productos aprobados (sin errores críticos)
- [ ] Políticas de la empresa publicadas
- [ ] Información de contacto visible
- [ ] SSL activo en el sitio web
- [ ] Structured data implementado (opcional pero recomendado)

### **6.2 Cronograma de Revisión**

**Semanal:**
- Revisar tasa de aprobación de productos
- Verificar errores en el feed
- Monitorear traffic de Google Shopping

**Mensual:**
- Analizar performance de productos
- Optimizar descripciones de productos con bajo CTR
- Revisar y actualizar precios si es necesario

**Trimestral:**
- Revisar compliance con políticas de Google
- Actualizar categorías de productos si hay nuevos
- Evaluar ROI de Google Shopping vs otros canales

## **Recursos Adicionales**

### **Enlaces Útiles:**
- [Centro de Ayuda de Google Merchant Center](https://support.google.com/merchants)
- [Especificaciones de Feed de Productos](https://support.google.com/merchants/answer/7052112)
- [Políticas de Google Shopping](https://support.google.com/merchants/answer/6149970)

### **Soporte Técnico:**
- Email: soporte@locind.com
- Documentación del API: `/api/merchant/` endpoints
- Logs del servidor: Revisar en backend para errores de feed

---

**¿Necesitas ayuda con algún paso específico? Cada fase debe completarse antes de pasar a la siguiente para asegurar una integración exitosa.** 