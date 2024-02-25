
const vaciar = document.getElementById('vaciarCarrito');

vaciar.addEventListener('click', async () => {
    try {
        const response = await fetch('/shop/cart/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
 // Recargar la página para reflejar los cambios
        location.reload();
        // Puedes realizar acciones adicionales después de vaciar el carrito si es necesario

    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
    }
});
