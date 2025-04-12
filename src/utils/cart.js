const CART_KEY = 'shoppingCart';

/**
 * @typedef {object} CartItem
 * @property {string} id - ID único del producto.
 * @property {string} name - Nombre del producto.
 * @property {number} price - Precio numérico del producto.
 * @property {string} image - URL de la imagen principal.
 * @property {number} quantity - Cantidad de este producto en el carrito.
 * @property {string} url - URL de la página de detalle del producto.
 */

/**
 * Obtiene los items del carrito desde localStorage.
 * @returns {Array<CartItem>} Array de items del carrito o array vacío.
 */
export function getCartItems() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return []; // No hacer nada en el lado del servidor
    }
    const cartData = localStorage.getItem(CART_KEY);
    try {
        const items = cartData ? JSON.parse(cartData) : [];
        // Asegurar que sea un array
        return Array.isArray(items) ? items : []; 
    } catch (e) {
        console.error("Error parsing cart data from localStorage", e);
        return [];
    }
}

/**
 * Guarda los items del carrito en localStorage.
 * @param {Array<CartItem>} items Array de items del carrito.
 */
export function saveCartItems(items) {
     if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return; // No hacer nada en el lado del servidor
    }
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
        console.error("Error saving cart data to localStorage", e);
    }
}

// --- Funciones Adicionales (a implementar) ---

/**
 * Añade un item al carrito o incrementa su cantidad.
 * @param {CartItem} newItem - El item a añadir.
 */
export function addToCart(newItem) {
    const items = getCartItems();
    const existingItemIndex = items.findIndex(item => item.id === newItem.id);

    if (existingItemIndex > -1) {
        // Item ya existe, incrementar cantidad
        items[existingItemIndex].quantity += newItem.quantity || 1;
    } else {
        // Añadir nuevo item, asegurando quantity
        items.push({...newItem, quantity: newItem.quantity || 1});
    }
    saveCartItems(items);
    // Disparar un evento personalizado para notificar cambios en el carrito
    window.dispatchEvent(new CustomEvent('cartchange'));
}

// ... (Aquí irían updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount) ...

/**
 * Calcula el número total de unidades en el carrito.
 * @returns {number} Total de unidades.
 */
export function getCartItemCount() {
    const items = getCartItems();
    return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Escucha cambios en el carrito (disparados por nuestras funciones).
 * @param {function} callback - Función a ejecutar cuando el carrito cambie.
 */
export function onCartChange(callback) {
    if (typeof window !== 'undefined') {
        window.addEventListener('cartchange', callback);
    }
}

// --- Funciones Adicionales (Implementación Pendiente) ---

/**
 * Actualiza la cantidad de un item en el carrito.
 * Si la cantidad llega a 0 o menos, elimina el item.
 * @param {string} productId
 * @param {number} newQuantity
 */
export function updateQuantity(productId, newQuantity) {
    let items = getCartItems();
    if (newQuantity <= 0) {
        items = items.filter(item => item.id !== productId);
    } else {
        const itemIndex = items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            items[itemIndex].quantity = newQuantity;
        }
    }
    saveCartItems(items);
    window.dispatchEvent(new CustomEvent('cartchange'));
}

/**
 * Elimina un item del carrito.
 * @param {string} productId
 */
export function removeFromCart(productId) {
    const items = getCartItems().filter(item => item.id !== productId);
    saveCartItems(items);
    window.dispatchEvent(new CustomEvent('cartchange'));
}

/**
 * Calcula el subtotal del carrito.
 * @returns {number}
 */
export function getCartSubtotal() {
    const items = getCartItems();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Vacía el carrito.
 */
export function clearCart() {
    saveCartItems([]);
    window.dispatchEvent(new CustomEvent('cartchange'));
} 