const fs = require('fs').promises;
const path = require('path');

// Mapeo de categorías de productos a categorías de Google
const GOOGLE_CATEGORIES = {
  'Hardware > Dispositivos de Rastreo': 'Electronics > GPS & Navigation > GPS Tracking Devices',
  'UWB Tracker': 'Electronics > Communications > Telecommunication Equipment > Radio Equipment'
};

// Configuración de URLs base
const BASE_URL = process.env.FRONTEND_URL || 'https://locind.com';
const IMAGE_BASE_URL = `${BASE_URL}/images/products/`;

class MerchantController {
  /**
   * Genera el feed XML para Google Merchant Center
   */
  async generateXMLFeed(req, res) {
    try {
      const products = await this.loadProducts();
      const xmlFeed = this.generateXML(products);
      
      res.set({
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      
      res.send(xmlFeed);
    } catch (error) {
      console.error('Error generando feed XML:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Genera el feed TXT para Google Merchant Center
   */
  async generateTextFeed(req, res) {
    try {
      const products = await this.loadProducts();
      const textFeed = this.generateTXT(products);
      
      res.set({
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      
      res.send(textFeed);
    } catch (error) {
      console.error('Error generando feed TXT:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Carga los productos desde los archivos MDX
   */
  async loadProducts() {
    const products = [];
    const productsDir = path.join(__dirname, '../../../frontend/src/content/products');
    
    try {
      const files = await fs.readdir(productsDir);
      
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          const content = await fs.readFile(path.join(productsDir, file), 'utf-8');
          const product = this.parseMDXProduct(content, file);
          if (product) {
            products.push(product);
          }
        }
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
    
    return products;
  }

  /**
   * Parsea un archivo MDX y extrae los datos del producto
   */
  parseMDXProduct(content, filename) {
    try {
      // Extraer frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const frontmatter = frontmatterMatch[1];
      const product = {};

      // Parsear YAML simple
      const lines = frontmatter.split('\n');
      let currentKey = null;
      let inArray = false;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        if (trimmed.startsWith('- ')) {
          if (inArray && currentKey) {
            if (!product[currentKey]) product[currentKey] = [];
            product[currentKey].push(trimmed.substring(2).replace(/^['"]|['"]$/g, ''));
          }
        } else if (trimmed.includes(':')) {
          const [key, ...valueParts] = trimmed.split(':');
          const value = valueParts.join(':').trim();
          
          currentKey = key.trim();
          inArray = false;

          if (value === '') {
            inArray = true;
          } else {
            product[currentKey] = value.replace(/^['"]|['"]$/g, '');
          }
        }
      }

      // Transformar a formato Google Merchant
      return this.transformProductForGoogle(product);
    } catch (error) {
      console.error(`Error parseando producto ${filename}:`, error);
      return null;
    }
  }

  /**
   * Transforma los datos del producto para el feed de Google
   */
  transformProductForGoogle(product) {
    const baseUrl = process.env.FRONTEND_URL || 'https://locind.com';
    
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      link: `${baseUrl}/productos/${this.slugify(product.id)}`,
      image_link: `${baseUrl}/images/products/${product.image_filename}`,
      availability: product.availability === 'in stock' ? 'in_stock' : 'out_of_stock',
      price: this.parsePrice(product.price),
      brand: product.brand,
      condition: product.condition,
      product_type: product.product_type,
      
      // GTIN temporal hasta que lleguen los reales
      gtin: product.gtin || `TEMP${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase(),
      
      // Categoría de Google (mapear desde product_type)
      google_product_category: this.mapToGoogleCategory(product.product_type),
      
      // Atributos personalizados
      custom_label_0: product.custom_label_0 || '',
      custom_label_1: product.custom_label_1 || '',
      custom_label_2: product.custom_label_2 || '',
      
      // Datos adicionales para cumplir requisitos mínimos
      mpn: product.mpn || product.id, // Usar ID como MPN temporal
      shipping: 'MX:::10.00 MXN', // Envío temporal
      shipping_weight: this.extractWeight(product.specs) || '1 kg'
    };
  }

  /**
   * Mapea categoría de producto a categoría de Google
   */
  mapToGoogleCategory(productType) {
    return GOOGLE_CATEGORIES[productType] || 'Electronics > GPS & Navigation > GPS Tracking Devices';
  }

  /**
   * Genera el XML feed
   */
  generateXML(products) {
    const items = products.map(product => `
    <item>
      <g:id>${this.escapeXML(product.id)}</g:id>
      <g:title>${this.escapeXML(product.title)}</g:title>
      <g:description>${this.escapeXML(product.description)}</g:description>
      <g:link>${this.escapeXML(product.link)}</g:link>
      <g:image_link>${this.escapeXML(product.image_link)}</g:image_link>
      ${product.additional_image_links.map(img => 
        `<g:additional_image_link>${this.escapeXML(img)}</g:additional_image_link>`
      ).join('\n      ')}
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.price}</g:price>
      <g:brand>${this.escapeXML(product.brand)}</g:brand>
      <g:condition>${product.condition}</g:condition>
      <g:product_type>${this.escapeXML(product.product_type)}</g:product_type>
      <g:google_product_category>${this.escapeXML(product.google_product_category)}</g:google_product_category>
      ${product.gtin ? `<g:gtin>${product.gtin}</g:gtin>` : ''}
      <g:mpn>${this.escapeXML(product.mpn)}</g:mpn>
      ${product.custom_label_0 ? `<g:custom_label_0>${this.escapeXML(product.custom_label_0)}</g:custom_label_0>` : ''}
      ${product.custom_label_1 ? `<g:custom_label_1>${this.escapeXML(product.custom_label_1)}</g:custom_label_1>` : ''}
    </item>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>LocInd - Productos Safeloc</title>
    <link>${BASE_URL}</link>
    <description>Productos de localización industrial y rastreo UWB de alta precisión</description>
    <language>es-MX</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
  }

  /**
   * Genera el TXT feed (TSV)
   */
  generateTXT(products) {
    const headers = [
      'id', 'title', 'description', 'link', 'image_link', 
      'availability', 'price', 'brand', 'condition', 
      'product_type', 'google_product_category', 'gtin', 'mpn',
      'custom_label_0', 'custom_label_1'
    ];

    const rows = products.map(product => 
      headers.map(header => {
        const value = product[header] || '';
        // Escapar tabs y comillas para TSV
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join('\t')
    );

    return [headers.join('\t'), ...rows].join('\n');
  }

  /**
   * Escapa caracteres especiales para XML
   */
  escapeXML(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Obtiene estadísticas del feed
   */
  async getFeedStats(req, res) {
    try {
      const products = await this.loadProducts();
      
      const stats = {
        total_products: products.length,
        by_availability: {},
        by_brand: {},
        price_range: {
          min: null,
          max: null,
          has_consultation: false
        },
        missing_data: {
          gtin: 0,
          images: 0
        }
      };

      products.forEach(product => {
        // Estadísticas de disponibilidad
        stats.by_availability[product.availability] = 
          (stats.by_availability[product.availability] || 0) + 1;

        // Estadísticas de marca
        stats.by_brand[product.brand] = 
          (stats.by_brand[product.brand] || 0) + 1;

        // Rango de precios
        if (product.price !== '0.00 MXN') {
          const priceNum = parseFloat(product.price.replace(/[^\d.]/g, ''));
          if (stats.price_range.min === null || priceNum < stats.price_range.min) {
            stats.price_range.min = priceNum;
          }
          if (stats.price_range.max === null || priceNum > stats.price_range.max) {
            stats.price_range.max = priceNum;
          }
        } else {
          stats.price_range.has_consultation = true;
        }

        // Datos faltantes
        if (!product.gtin) stats.missing_data.gtin++;
        if (!product.image_link) stats.missing_data.images++;
      });

      res.json(stats);
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = new MerchantController(); 