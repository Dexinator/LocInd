import { defineCollection, z } from 'astro:content';

// Definir el schema para la colección de productos
const productsCollection = defineCollection({
    type: 'content', // Marcar como colección de contenido (Markdown/MDX)
    schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        image_link: z.string(),
        additional_image_link: z.array(z.string()).optional(), // Array de strings, opcional
        availability: z.enum(['in stock', 'out of stock', 'preorder']), // Valores permitidos
        price: z.string(), // Mantener como string para manejar "Consultar"
        brand: z.string().optional(),
        gtin: z.string().optional(),
        mpn: z.string().optional(),
        condition: z.enum(['new', 'refurbished', 'used']), // Valores permitidos
        product_type: z.string().optional(),
        google_product_category: z.string().optional(),
        custom_label_0: z.string().optional(),
        custom_label_1: z.string().optional(),
        custom_label_2: z.string().optional(), // Añadir más si se usan
        custom_label_3: z.string().optional(),
        custom_label_4: z.string().optional(),
        features: z.array(z.string()).optional(), // Array de strings para características
        specs: z.array(z.object({ // Array de objetos para especificaciones
            name: z.string(),
            value: z.string(),
        })).optional(),
        // Añadir cualquier otro campo del frontmatter que necesitemos validar
    }),
});

// Exportar un objeto `collections` con todas las colecciones definidas
export const collections = {
    'products': productsCollection,
    // Aquí podríamos añadir otras colecciones en el futuro (ej. 'blog', 'casosExito')
}; 