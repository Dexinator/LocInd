# 📋 Plan de Acción Completo: Sincronización con Google Merchant Center

## 🎯 **Objetivo**
Integrar completamente el catálogo de productos LocInd (Safeloc) con Google Merchant Center para aumentar la visibilidad online y generar leads B2B.

---

## ✅ **Lo que ya tienes implementado**

### **Infraestructura Backend**
- ✅ **API de Feed**: `/api/merchant/feed.xml` y `/api/merchant/feed.txt`
- ✅ **Parser de productos**: Extrae datos de archivos MDX automáticamente
- ✅ **Mapeo de categorías**: Google Product Categories configuradas
- ✅ **Validación de datos**: Estadísticas y reportes de cumplimiento
- ✅ **Dashboard de monitoreo**: Panel de administración completo

### **Estructura de Datos**
- ✅ **4 productos Safeloc** completamente documentados
- ✅ **Schema validado** en TypeScript/Astro
- ✅ **Atributos principales**: título, descripción, precio, imágenes, marca
- ✅ **Categorización**: Custom labels para segmentación B2B

---

## 🚀 **Cronograma de Implementación**

### **Semana 1: Preparación de Datos**
**Status: ✅ COMPLETADO**

#### **Tareas realizadas:**
1. ✅ Análisis de requerimientos de Google Merchant
2. ✅ Mapeo de datos existentes vs requeridos
3. ✅ Implementación del controlador de feed
4. ✅ Configuración de rutas de API
5. ✅ Script de actualización de productos

**Entregables:**
- `backend/src/controllers/merchantController.js`
- `backend/src/routes/merchantRoutes.js`
- `backend/scripts/update-products-for-merchant.js`
- `backend/src/merchant-center-mapping.md`

### **Semana 2: Completar Datos Faltantes**
**Status: 🔄 EN PROGRESO**

#### **Tareas por completar:**
1. **Obtener GTINs reales del proveedor Safeloc**
   ```bash
   # Ejecutar script de actualización
   cd backend
   node scripts/update-products-for-merchant.js
   ```

2. **Validar URLs de productos**
   - ✅ Estructura: `/productos/[slug]`
   - ⚠️ Verificar accesibilidad pública

3. **Optimizar imágenes de productos**
   - ✅ Archivos WebP disponibles
   - ⚠️ Verificar URLs públicas de imágenes

4. **Configurar precios para mercado internacional**
   - Considerar conversión MXN → USD para audiencia global

**Comandos útiles:**
```bash
# Validar estado actual
npm run validate-merchant-data

# Generar feeds de muestra
npm run generate-sample-feeds

# Verificar accesibilidad
curl -I https://tu-dominio.com/api/merchant/feed.xml
```

### **Semana 3: Configuración de Google Merchant Center**
**Status: ⏳ PENDIENTE**

#### **Checklist de configuración:**
- [ ] Crear cuenta Google Merchant Center
- [ ] Verificar dominio del sitio web
- [ ] Configurar información fiscal (México)
- [ ] Configurar políticas de envío
- [ ] Agregar feed de productos
- [ ] Validar primeros productos

**URLs importantes:**
- Feed XML: `https://tu-dominio.com/api/merchant/feed.xml`
- Feed TXT: `https://tu-dominio.com/api/merchant/feed.txt`
- Dashboard: `https://tu-dominio.com/admin/merchant-dashboard`

### **Semana 4: Testing y Optimización**
**Status: ⏳ PENDIENTE**

#### **Validaciones necesarias:**
1. **Feed accessibility test**
2. **Product approval monitoring**
3. **Performance baseline**
4. **Error resolution**

---

## 🛠️ **Comandos de Implementación**

### **1. Ejecutar Script de Actualización**
```bash
cd backend
node scripts/update-products-for-merchant.js
```

### **2. Levantar Backend con Nuevas Rutas**
```bash
cd backend
npm install
npm run dev
```

### **3. Verificar Endpoints**
```bash
# Probar feed XML
curl http://localhost:3000/api/merchant/feed.xml

# Probar estadísticas
curl http://localhost:3000/api/merchant/stats

# Probar feed TXT
curl http://localhost:3000/api/merchant/feed.txt
```

### **4. Acceder al Dashboard**
```
http://localhost:4321/admin/merchant-dashboard
```

---

## 📊 **URLs del Sistema**

### **Endpoints de API**
| Endpoint | Propósito | Formato |
|----------|-----------|---------|
| `/api/merchant/feed.xml` | Feed principal para Google | XML RSS |
| `/api/merchant/feed.txt` | Feed alternativo | TSV/TXT |
| `/api/merchant/stats` | Estadísticas del catálogo | JSON |

### **URLs de Configuración**
| URL | Descripción |
|-----|-------------|
| `https://merchants.google.com` | Google Merchant Center |
| `/admin/merchant-dashboard` | Dashboard interno |
| `/productos/[slug]` | Landing pages de productos |

---

## 🎯 **Datos Críticos por Completar**

### **1. GTINs (Global Trade Item Numbers)**
```javascript
// Actualizar en: backend/scripts/update-products-for-merchant.js
const PRODUCT_UPDATES = {
  'SAFEA-3.mdx': {
    gtin: 'XXXXXXXXXXXXXXX', // ⚠️ Obtener del proveedor
  },
  // ... otros productos
};
```

### **2. Precios en Formato Internacional**
- **Actual**: `17,568 MXN`
- **Requerido**: `17568.00 MXN` (sin comas, con decimales)

### **3. Categorías Google Optimizadas**
```xml
<g:google_product_category>Electronics > GPS & Navigation > GPS Tracking Devices</g:google_product_category>
```

---

## 📈 **Métricas de Éxito**

### **KPIs Técnicos**
- **Tasa de aprobación**: >95% de productos aprobados
- **Uptime del feed**: >99.9%
- **Tiempo de respuesta**: <2 segundos
- **Errores de validación**: 0

### **KPIs de Negocio**
- **Impresiones mensuales**: Meta inicial 1,000+
- **CTR (Click-through rate)**: >1%
- **Leads generados**: 5+ por mes
- **ROI positivo**: En 3 meses

---

## 🆘 **Soporte y Troubleshooting**

### **Problemas Comunes**
1. **Feed no accesible**: Verificar CORS y firewall
2. **Productos rechazados**: Revisar GTINs y precios
3. **Imágenes no cargan**: Verificar URLs públicas
4. **Categorías incorrectas**: Usar taxonomy de Google

### **Logs de Debugging**
```bash
# Ver logs del backend
tail -f backend/logs/merchant.log

# Validar feed manualmente
xmllint --noout --valid backend/sample-feed.xml
```

### **Contactos de Soporte**
- **Técnico**: soporte@locind.com
- **Google Merchant**: [Centro de Ayuda](https://support.google.com/merchants)
- **Documentación**: `/docs/google-merchant-setup.md`

---

## 🎯 **Próximos Pasos Inmediatos**

### **Esta Semana (Acción Requerida)**
1. **Obtener GTINs reales** de productos Safeloc
2. **Ejecutar script de actualización** con datos reales
3. **Verificar accesibilidad pública** de imágenes
4. **Configurar dominio de producción** para feed URLs

### **Próxima Semana**
1. **Crear cuenta Google Merchant Center**
2. **Configurar feed automático**
3. **Enviar productos para aprobación**
4. **Monitorear dashboard de errores**

---

**🚀 ¿Listo para comenzar? El sistema está preparado, solo necesitas completar los datos faltantes y configurar Google Merchant Center.** 