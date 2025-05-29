# Mapeo de Datos para Google Merchant Center

## Atributos Requeridos vs Datos Actuales

### ✅ **Datos que YA tenemos**
| Atributo Google Merchant | Campo Actual | Estado |
|-------------------------|--------------|---------|
| `id [id]` | `id` | ✅ Completo |
| `title [title]` | `title` | ✅ Completo |
| `description [description]` | `description` | ✅ Completo |
| `price [price]` | `price` | ✅ Completo |
| `availability [availability]` | `availability` | ✅ Completo |
| `condition [condition]` | `condition` | ✅ Completo |
| `brand [brand]` | `brand` | ✅ Completo |
| `image_link [image_link]` | `image_filename` | ✅ Necesita URL completa |
| `product_type [product_type]` | `product_type` | ✅ Completo |
| `google_product_category [google_product_category]` | `google_product_category` | ⚠️ Por definir |

### ⚠️ **Datos que necesitamos COMPLETAR**
| Atributo Google Merchant | Prioridad | Acción Requerida |
|-------------------------|-----------|------------------|
| `link [link]` | **ALTA** | Generar URL del producto |
| `gtin [gtin]` | **ALTA** | Obtener códigos de barras |
| `mpn [mpn]` | **MEDIA** | Completar números de parte |
| `google_product_category` | **ALTA** | Definir categorías Google |

### 📊 **Categorías Google Product recomendadas**
- **Electronics > Communications > Telecommunication Equipment > Radio Equipment**
- **Business & Industrial > Material Handling > Packaging & Shipping Equipment > Tracking Devices**

## Próximos Pasos

1. **Completar GTINs**: Contactar al proveedor Safeloc
2. **Definir URLs**: Estructura de URLs de productos
3. **Validar precios**: Formato de moneda (MXN → USD/MXN)
4. **Optimizar descripciones**: Para SEO y conversión 