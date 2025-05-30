# 🛒 **Configuración Google Merchant Center - LocInd**

## 📋 **Lista de Verificación Previa**

Antes de configurar Google Merchant Center, asegúrate de tener:

- ✅ **Backend funcionando**: `https://locind-backend-api-e2da701e559b.herokuapp.com/health`
- ✅ **Feed XML generándose**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml`
- ✅ **Estadísticas disponibles**: `https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/stats`
- ✅ **4 productos Safeloc configurados**
- ⏳ **Dominio verificado** (pendiente)
- ⏳ **Códigos GTIN del fabricante** (próxima semana)

---

## 🚀 **Paso 1: Crear/Configurar Cuenta Google Merchant Center**

### **1.1 Registro**
1. Ve a [Google Merchant Center](https://merchants.google.com)
2. Inicia sesión con tu cuenta de Google empresarial
3. **Crear cuenta empresarial** con estos datos:
   - **Nombre de la empresa**: LocInd - Localización Industrial
   - **País**: México
   - **Tipo de cuenta**: Empresa
   - **Sitio web**: https://localizacion-industrial.com

### **1.2 Verificación de Dominio**
1. En GMC, ve a **"Business information" > "Website"**
2. Agregar URL: `https://localizacion-industrial.com`
3. **Métodos de verificación disponibles:**
   - HTML file upload (recomendado)
   - HTML tag
   - Google Analytics
   - Google Tag Manager

---

## 🛒 **Paso 2: Configurar Feed de Productos**

### **2.1 Crear Nuevo Feed**
1. En GMC, ve a **"Products" > "Feeds"**
2. Clic en **"+"** para crear nuevo feed
3. **Configuración del feed:**

```
Nombre del feed: LocInd Productos Safeloc
País de venta: México
Idioma: Español (España)
Moneda: MXN
```

### **2.2 Método de Envío**
Seleccionar **"Scheduled fetch"** (Recomendado):

```
Método: Scheduled fetch
URL del feed: https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml
Frecuencia: Daily (Diaria)
Hora preferida: 02:00 GMT (para evitar picos de tráfico)
```

### **2.3 Verificar Feed**
Antes de guardar, **probar la URL**:
- Pegar URL en navegador
- Verificar que carga XML válido
- Confirmar que muestra 4 productos

---

## 📊 **Paso 3: Datos del Feed Actual**

### **✅ Datos Completos Disponibles:**

| Campo | Valor | Estado |
|-------|-------|--------|
| **ID** | SAFELOC ANCHOR SAFEA-3, etc. | ✅ |
| **Título** | Ancla Safe A-3, etc. | ✅ |
| **Descripción** | Descripciones completas | ✅ |
| **Precio** | Precios en MXN | ✅ |
| **Disponibilidad** | in_stock | ✅ |
| **Condición** | new | ✅ |
| **Marca** | Safeloc | ✅ |
| **Imágenes** | URLs completas | ✅ |
| **Categorías** | Mapeadas a Google | ✅ |

### **⚠️ Datos Temporales:**

| Campo | Estado Actual | Próxima Semana |
|-------|---------------|----------------|
| **GTIN** | Códigos temporales (TEMP...) | ✅ Códigos reales del fabricante |
| **URLs de producto** | Placeholder (/productos/...) | ✅ URLs completas del frontend |

---

## 🔍 **Paso 4: Primera Validación**

### **4.1 Procesamiento Inicial**
Después de crear el feed:
- **Tiempo de procesamiento**: 1-3 horas para primera lectura
- **Validación**: Google verificará formato y datos
- **Notificaciones**: Recibirás emails sobre el estado

### **4.2 Posibles Warnings Iniciales (Esperados)**
```
⚠️ Missing GTIN: Productos sin códigos GTIN válidos
⚠️ Missing shipping info: Información de envío incompleta  
⚠️ Image quality: Calidad de imágenes (si aplica)
```
**Estas warnings son normales y se resolverán la próxima semana.**

### **4.3 Monitoreo del Feed**
1. **Dashboard GMC**: "Products" > "Diagnostics"
2. **Dashboard local**: Ve a `/admin/merchant-dashboard` en tu frontend
3. **Verificación manual**: Revisa URL del feed regularmente

---

## 📈 **Paso 5: Optimización Post-Configuración**

### **5.1 Esta Semana (Inmediato)**
- ✅ **Feed XML funcionando automáticamente**
- ⏳ **Verificar dominio en GMC**
- ⏳ **Crear primer feed con URL temporal**
- ⏳ **Monitorear procesamiento inicial**

### **5.2 Próxima Semana (Con GTINs)**
- 🔄 **Actualizar productos con GTINs reales**
- 🔄 **Re-deploy automático del backend**
- 🔄 **Verificar validación completa**
- 🔄 **Configurar anuncios Shopping (opcional)**

---

## 🛠️ **Paso 6: Monitoreo y Mantenimiento**

### **6.1 URLs de Verificación**

**Verificación diaria:**
```bash
# Feed principal
curl https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml

# Estadísticas del catálogo
curl https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/stats

# Health check del backend
curl https://locind-backend-api-e2da701e559b.herokuapp.com/health
```

### **6.2 Dashboard de Administración**
Ve a `/admin/merchant-dashboard` en tu frontend local para:
- Ver estadísticas en tiempo real
- Descargar feeds manualmente
- Verificar compliance
- Monitor de validación

### **6.3 Alertas y Notificaciones**
- **Google Merchant**: Configurar notificaciones por email
- **Heroku**: Monitoring de uptime del backend
- **Manual**: Verificación semanal del feed

---

## 🔧 **Troubleshooting**

### **Errores Comunes y Soluciones**

| Error | Causa | Solución |
|-------|-------|----------|
| **Feed not accessible** | Backend down | Verificar `heroku logs --app locind-backend-api` |
| **Invalid XML format** | Error en el feed | Verificar URL del feed manualmente |
| **Missing product data** | Datos incompletos | Revisar `/api/merchant/stats` |
| **Domain not verified** | Dominio sin verificar | Completar verificación en GMC |

### **Comandos de Diagnóstico**
```bash
# Ver logs del backend
heroku logs --app locind-backend-api

# Verificar feed XML
curl -I https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/feed.xml

# Ver estadísticas
curl https://locind-backend-api-e2da701e559b.herokuapp.com/api/merchant/stats | jq
```

---

## 📞 **Soporte y Recursos**

### **Documentación Oficial**
- [Google Merchant Center Help](https://support.google.com/merchants)
- [Product Data Specification](https://support.google.com/merchants/answer/7052112)
- [Feed Rules and Formatting](https://support.google.com/merchants/answer/160081)

### **Recursos LocInd**
- **Backend URL**: `https://locind-backend-api-e2da701e559b.herokuapp.com`
- **Dashboard local**: `/admin/merchant-dashboard`
- **Documentación técnica**: `README.md`

---

## ✅ **Checklist de Configuración Completa**

- [ ] **Cuenta GMC creada** con datos de LocInd
- [ ] **Dominio verificado** (localizacion-industrial.com)
- [ ] **Feed creado** con URL del backend
- [ ] **Scheduled fetch configurado** (diario)
- [ ] **Primera sincronización** completada
- [ ] **Warnings iniciales** revisadas (GTIN temporal OK)
- [ ] **Dashboard de monitoreo** funcionando
- [ ] **Alertas configuradas** para notificaciones

**🎯 Una vez completado este checklist, tu sistema estará 100% funcional y listo para sincronización automática con Google Merchant Center.** 