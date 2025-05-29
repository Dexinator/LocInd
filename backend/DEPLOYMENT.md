# 🚀 Deployment del Backend a Heroku

## **Pasos para Subir a Heroku (Ejecutar HOY)**

### **1. Instalar Heroku CLI (si no lo tienes)**
```bash
# En Windows
winget install Heroku.HerokuCLI
# O descargar desde: https://devcenter.heroku.com/articles/heroku-cli
```

### **2. Comandos de Deployment**
```bash
# Desde la carpeta backend/
cd backend

# Login a Heroku
heroku login

# Crear app en Heroku
heroku create locind-backend-api

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://localizacion-industrial.com
heroku config:set GOOGLE_MERCHANT_FEED_TITLE="LocInd - Productos Industriales Safeloc"
heroku config:set GOOGLE_MERCHANT_FEED_DESCRIPTION="Catálogo de productos de localización industrial"

# Configurar Mercado Pago (reemplazar con tus valores reales)
heroku config:set MP_ACCESS_TOKEN=tu_access_token_real
heroku config:set MP_PUBLIC_KEY=tu_public_key_real

# Preparar git
git add .
git commit -m "Initial deployment con Google Merchant Center"

# Deploy a Heroku
git push heroku main
```

### **3. Verificar Deployment**
Después del deployment, estas URLs estarán disponibles:

- **Feed XML**: `https://locind-backend-api.herokuapp.com/api/merchant/feed.xml`
- **Feed TXT**: `https://locind-backend-api.herokuapp.com/api/merchant/feed.txt`
- **Estadísticas**: `https://locind-backend-api.herokuapp.com/api/merchant/stats`

### **4. Probar el Feed (SIN GTIN)**
```bash
# Probar feed XML
curl https://locind-backend-api.herokuapp.com/api/merchant/feed.xml

# Probar estadísticas
curl https://locind-backend-api.herokuapp.com/api/merchant/stats
```

---

## **🎯 Lo que funcionará AHORA (sin GTIN):**

✅ **Feed XML generado automáticamente**  
✅ **4 productos Safeloc mapeados**  
✅ **GTIN temporales (se actualizarán cuando lleguen los reales)**  
✅ **Categorías de Google configuradas**  
✅ **Precios y disponibilidad correctos**  
✅ **API totalmente funcional**

---

## **🔄 Próxima Semana (cuando lleguen los GTIN):**

1. **Actualizar productos con GTIN reales**
2. **Re-deployar con un simple git push**
3. **Configurar Google Merchant Center**
4. **Feed listo para producción**

## **🚨 URLs Importantes**

- **Backend API**: `https://locind-backend-api.herokuapp.com`
- **Feed para Google**: `https://locind-backend-api.herokuapp.com/api/merchant/feed.xml`
- **Dashboard**: Tu frontend + `/admin/merchant-dashboard` 