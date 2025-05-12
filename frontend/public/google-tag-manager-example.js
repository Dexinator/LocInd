// Código de ejemplo para implementar Google Tag Manager
// Debes obtener tu ID de GTM de la consola de Google Tag Manager
// y sustituir 'GTM-XXXXXXX' con tu ID real

// Coloca este código justo después de la etiqueta <head> en BaseLayout.astro
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');

// Coloca este código justo después de la etiqueta <body> en BaseLayout.astro
// <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->

// Ejemplo de evento personalizado para seguimiento de conversiones
function trackConversion(eventName, eventData) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
}

// Ejemplo de uso:
// trackConversion('purchase', {
//   transaction_id: 'T12345',
//   value: 999.99,
//   currency: 'MXN',
//   items: [
//     {
//       item_id: 'SKU_123',
//       item_name: 'Sistema de geolocalización industrial',
//       price: 999.99,
//       quantity: 1
//     }
//   ]
// });

// NOTA: Este es un archivo de ejemplo. Debes obtener tu propio ID de GTM
// y modificar el código según tus necesidades específicas. 