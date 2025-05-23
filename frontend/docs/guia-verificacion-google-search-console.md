# Guía de Verificación en Google Search Console

Esta guía proporciona instrucciones paso a paso para verificar el sitio en Google Search Console, enviar sitemaps y solicitar indexación de páginas individuales.

## 1. Verificar tu sitio en Google Search Console

### Acceder y añadir propiedad

1. **Accede a Google Search Console**:
   - Ve a [https://search.google.com/search-console](https://search.google.com/search-console)
   - Inicia sesión con tu cuenta de Google

2. **Añade tu propiedad**:
   - Haz clic en el botón "Añadir propiedad" en la parte superior izquierda
   - Selecciona "Prefijo de URL" (más sencillo que la verificación de dominio)
   - Introduce la URL completa: `https://localizacion-industrial.com/`
   - Haz clic en "Continuar"

### Método de verificación con archivo HTML

1. **Selecciona el método de archivo HTML**:
   - En las opciones de verificación, selecciona "Archivo HTML"
   - Google te mostrará el nombre del archivo necesario, debe coincidir con `google-site-verification.html`
   - Este archivo ya está en la carpeta `public` de nuestro proyecto
   - Haz clic en "Verificar"

2. **Si la verificación falla**:
   - Asegúrate de que el sitio esté desplegado y accesible
   - Comprueba que el archivo esté en la raíz del sitio
   - Intenta visitar directamente la URL: `https://localizacion-industrial.com/google-site-verification.html`

### Método alternativo: meta tag

Si el método de archivo HTML no funciona, puedes usar el método de meta tag:

1. **Selecciona el método de etiqueta HTML**:
   - Google te proporcionará un código meta tag similar a:
   ```html
   <meta name="google-site-verification" content="yCT0Yd9jRbSIKD3sNrTX_QNOrD6PvmPzx45rFNIC7W4" />
   ```

2. **Añade el meta tag al head del sitio**:
   - Edita el archivo `frontend/src/layouts/BaseLayout.astro`
   - Añade el meta tag dentro de la sección `<head>`, justo después de las otras meta tags
   - Despliega los cambios
   - Vuelve a Google Search Console y haz clic en "Verificar"

## 2. Enviar sitemaps a Google Search Console

Una vez verificado el sitio, es hora de enviar los sitemaps para mejorar la indexación:

1. **Accede a la sección de sitemaps**:
   - En el menú lateral izquierdo, haz clic en "Sitemaps"
   - Verás una interfaz para añadir nuevos sitemaps

2. **Envía el sitemap-index.xml primero**:
   - En el campo "Añadir un nuevo sitemap", ingresa: `sitemap-index.xml`
   - Haz clic en "Enviar"
   - Este archivo referencia los otros sitemaps, pero es buena práctica enviarlos todos

3. **Envía los sitemaps individuales**:
   - Repite el proceso para añadir:
     - `sitemap.xml`
     - `productos-sitemap.xml`
   - Esto garantiza que todos sean procesados, incluso si hay algún problema con el índice

4. **Verifica el estado de los sitemaps**:
   - La tabla mostrará el estado de cada sitemap
   - Busca "Éxito" en la columna de estado y el número de URLs descubiertas
   - Si hay errores, haz clic en el sitemap para ver detalles específicos

## 3. Solicitar indexación de páginas individuales

Para acelerar la indexación de páginas específicas, especialmente los productos:

1. **Usa la herramienta de inspección de URL**:
   - En la barra superior de Google Search Console, encontrarás un campo de búsqueda
   - Este es el acceso a la herramienta "Inspección de URL"

2. **Inspecciona cada página de producto**:
   - Introduce la URL completa de cada producto:
     - `https://localizacion-industrial.com/productos/safet-3/`
     - `https://localizacion-industrial.com/productos/safeo-3/`
     - `https://localizacion-industrial.com/productos/safea-3/`
     - `https://localizacion-industrial.com/productos/safev-3/`
   - Haz clic en "Inspeccionar" para cada una

3. **Solicita la indexación**:
   - Después de la inspección, verás el estado actual de la URL
   - Busca el botón "Solicitar indexación"
   - Haz clic en este botón para cada URL
   - Google confirmará que ha recibido tu solicitud

4. **Repite para páginas importantes**:
   - También solicita la indexación de:
     - `https://localizacion-industrial.com/` (página principal)
     - `https://localizacion-industrial.com/como-funciona/`
     - `https://localizacion-industrial.com/productos/`
     - `https://localizacion-industrial.com/casos-exito/`
     - `https://localizacion-industrial.com/contacto/`

## 4. Monitoreo y seguimiento

Después de la verificación y envío de sitemaps, es importante monitorear el progreso:

1. **Revisa la sección "Cobertura"**:
   - En el menú lateral, haz clic en "Cobertura"
   - Esta sección muestra el estado de indexación de tus páginas
   - Presta atención a errores o advertencias

2. **Monitorea el rendimiento**:
   - La sección "Rendimiento" muestra cómo aparece tu sitio en las búsquedas
   - Revisa las impresiones, clics y posición media
   - Analiza qué consultas están generando tráfico

3. **Verifica enlaces**:
   - La sección "Enlaces" muestra enlaces internos y externos
   - Asegúrate de que los enlaces internos se estén rastreando correctamente

4. **Calendario de revisión**:
   - Establece un calendario para revisar Google Search Console:
     - Primer mes: revisión semanal
     - Después: revisión quincenal o mensual
   - Documenta los cambios y tendencias que observes

## Resolución de problemas comunes

### URLs no indexadas

Si algunas URLs no se indexan después de varias semanas:
- Verifica que no estén bloqueadas por robots.txt
- Asegúrate de que sean accesibles (no devuelven error 404 o 500)
- Comprueba que tengan contenido único y valioso
- Mejora los enlaces internos hacia esas páginas

### Errores de rastreo

Si Google reporta errores de rastreo:
- Verifica los códigos de estado HTTP
- Asegúrate de que las redirecciones están configuradas correctamente
- Comprueba que el servidor responde rápidamente

### Problemas con sitemaps

Si los sitemaps muestran errores:
- Verifica que sean XML válido
- Asegúrate de que todas las URLs sean accesibles
- Comprueba que los formatos de fecha sean correctos
- Confirma que las URLs usen el mismo protocolo (https) y dominio 