const fs = require('fs').promises;
const path = require('path');

/**
 * Script para actualizar productos con datos necesarios para Google Merchant Center
 */

// Datos faltantes que necesitamos agregar
const PRODUCT_UPDATES = {
  'SAFEA-3.mdx': {
    gtin: '8437021459631', // Ejemplo - reemplazar con GTIN real
    google_product_category: 'Electronics > GPS & Navigation > GPS Tracking Devices',
    shipping_weight: '2.5 kg',
    product_dimension: '150x100x50 mm'
  },
  'SAFEO-3.mdx': {
    gtin: '8437021459648', // Ejemplo - reemplazar con GTIN real
    google_product_category: 'Electronics > GPS & Navigation > GPS Tracking Devices',
    shipping_weight: '0.2 kg',
    product_dimension: '50x30x15 mm'
  },
  'SAFET-3.mdx': {
    gtin: '8437021459655', // Ejemplo - reemplazar con GTIN real
    google_product_category: 'Electronics > GPS & Navigation > GPS Tracking Devices',
    shipping_weight: '0.15 kg',
    product_dimension: '40x25x12 mm'
  },
  'SAFEV-3.mdx': {
    gtin: '8437021459662', // Ejemplo - reemplazar con GTIN real
    google_product_category: 'Electronics > GPS & Navigation > GPS Tracking Devices',
    shipping_weight: '1.8 kg',
    product_dimension: '120x80x40 mm'
  }
};

async function updateProductFile(filename, updates) {
  const filePath = path.join(__dirname, '../../frontend/src/content/products', filename);
  
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Extraer frontmatter
    const frontmatterMatch = content.match(/^(---\n)([\s\S]*?)\n(---)/);
    if (!frontmatterMatch) {
      console.error(`No se encontró frontmatter en ${filename}`);
      return;
    }
    
    let frontmatter = frontmatterMatch[2];
    const beforeFrontmatter = frontmatterMatch[1];
    const afterFrontmatter = frontmatterMatch[3];
    const restOfContent = content.substring(frontmatterMatch[0].length);
    
    // Agregar nuevos campos al frontmatter
    Object.entries(updates).forEach(([key, value]) => {
      // Verificar si el campo ya existe
      const fieldRegex = new RegExp(`^${key}:`, 'm');
      if (!fieldRegex.test(frontmatter)) {
        frontmatter += `\n${key}: '${value}'`;
      }
    });
    
    // Reconstruir el archivo
    const newContent = beforeFrontmatter + frontmatter + '\n' + afterFrontmatter + restOfContent;
    
    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`✅ Actualizado: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error actualizando ${filename}:`, error.message);
  }
}

async function validateProductData() {
  console.log('🔍 Validando datos de productos para Google Merchant...\n');
  
  const productsDir = path.join(__dirname, '../../frontend/src/content/products');
  const files = await fs.readdir(productsDir);
  
  const validation = {
    total: 0,
    missing_gtin: [],
    missing_google_category: [],
    price_issues: [],
    missing_images: []
  };
  
  for (const file of files.filter(f => f.endsWith('.mdx'))) {
    validation.total++;
    
    const content = await fs.readFile(path.join(productsDir, file), 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      
      // Verificar GTIN
      if (!frontmatter.includes('gtin:')) {
        validation.missing_gtin.push(file);
      }
      
      // Verificar categoría Google
      if (!frontmatter.includes('google_product_category:')) {
        validation.missing_google_category.push(file);
      }
      
      // Verificar precio
      const priceMatch = frontmatter.match(/price:\s*'([^']+)'/);
      if (!priceMatch || priceMatch[1] === 'Consultar') {
        validation.price_issues.push(file);
      }
      
      // Verificar imagen
      if (!frontmatter.includes('image_filename:')) {
        validation.missing_images.push(file);
      }
    }
  }
  
  console.log('📊 Reporte de Validación:');
  console.log(`Total de productos: ${validation.total}`);
  console.log(`Productos sin GTIN: ${validation.missing_gtin.length}`);
  console.log(`Productos sin categoría Google: ${validation.missing_google_category.length}`);
  console.log(`Productos con problemas de precio: ${validation.price_issues.length}`);
  console.log(`Productos sin imagen: ${validation.missing_images.length}\n`);
  
  if (validation.missing_gtin.length > 0) {
    console.log('❌ Productos sin GTIN:', validation.missing_gtin);
  }
  
  if (validation.missing_google_category.length > 0) {
    console.log('❌ Productos sin categoría Google:', validation.missing_google_category);
  }
  
  return validation;
}

async function generateSampleFeed() {
  console.log('📄 Generando feed de muestra...\n');
  
  const MerchantController = require('../src/controllers/merchantController');
  const products = await MerchantController.loadProducts();
  
  console.log(`Productos cargados: ${products.length}`);
  
  // Generar XML de muestra
  const xmlSample = MerchantController.generateXML(products.slice(0, 2));
  await fs.writeFile(
    path.join(__dirname, '../sample-feed.xml'), 
    xmlSample, 
    'utf-8'
  );
  
  // Generar TXT de muestra
  const txtSample = MerchantController.generateTXT(products.slice(0, 2));
  await fs.writeFile(
    path.join(__dirname, '../sample-feed.txt'), 
    txtSample, 
    'utf-8'
  );
  
  console.log('✅ Feeds de muestra generados en:');
  console.log('   - backend/sample-feed.xml');
  console.log('   - backend/sample-feed.txt');
}

async function main() {
  console.log('🚀 Iniciando actualización de productos para Google Merchant Center\n');
  
  try {
    // 1. Validar estado actual
    await validateProductData();
    
    // 2. Actualizar productos con datos faltantes
    console.log('📝 Actualizando productos...\n');
    for (const [filename, updates] of Object.entries(PRODUCT_UPDATES)) {
      await updateProductFile(filename, updates);
    }
    
    // 3. Generar feeds de muestra
    await generateSampleFeed();
    
    // 4. Validar nuevamente
    console.log('\n🔍 Validación final...\n');
    await validateProductData();
    
    console.log('\n✅ Proceso completado exitosamente!');
    console.log('\n📋 Próximos pasos manuales:');
    console.log('1. Verificar y reemplazar GTINs con códigos reales del proveedor');
    console.log('2. Validar que las URLs de productos sean accesibles');
    console.log('3. Comprobar que las imágenes estén disponibles públicamente');
    console.log('4. Configurar Google Merchant Center account');
    
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = {
  updateProductFile,
  validateProductData,
  generateSampleFeed,
  PRODUCT_UPDATES
}; 