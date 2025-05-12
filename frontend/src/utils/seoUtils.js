/**
 * Genera los datos estructurados de la organización para Schema.org
 * @returns {Object} Datos estructurados para una organización
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://localizacion-industrial.com/#organization",
    "name": "Localización Industrial",
    "url": "https://localizacion-industrial.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://localizacion-industrial.com/logo.svg",
      "width": 112,
      "height": 112
    },
    "description": "Soluciones avanzadas de geolocalización indoor para optimizar procesos industriales, logísticos y de manufactura con precisión y seguridad en tiempo real.",
    "sameAs": [
      "https://www.facebook.com/localizacionindustrial",
      "https://www.linkedin.com/company/localizacionindustrial"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-123-456-7890",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    }
  };
}

/**
 * Genera los datos estructurados para una página web según Schema.org
 * @param {string} title - Título de la página
 * @param {string} description - Descripción de la página
 * @param {string} url - URL canónica de la página
 * @returns {Object} Datos estructurados para una página web
 */
export function getWebPageSchema(title, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": "https://localizacion-industrial.com/#website"
    },
    "datePublished": "2023-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "inLanguage": "es-MX"
  };
}

/**
 * Genera metadatos para las redes sociales
 * @param {string} title - Título de la página
 * @param {string} description - Descripción de la página
 * @param {string} image - URL de la imagen
 * @returns {Object} Metadatos para Open Graph y Twitter
 */
export function getSocialMetadata(title, description, image) {
  const fullImage = image.startsWith('http') ? image : `https://localizacion-industrial.com${image}`;
  
  return {
    openGraph: {
      basic: {
        title: title,
        type: "website",
        image: fullImage,
      },
      optional: {
        description: description,
        siteName: "Localización Industrial",
        locale: "es_MX",
      }
    },
    twitter: {
      card: "summary_large_image",
      site: "@locualizacionindustrial",
      title: title,
      description: description,
      image: fullImage,
      imageAlt: "Localización Industrial logo",
    }
  };
} 