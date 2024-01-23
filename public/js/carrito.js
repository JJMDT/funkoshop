document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.getElementById("addToCart");
    const quantityInput = document.getElementById("quantity");

  addToCartButton.addEventListener('click', () => {
    const productId = addToCartButton.getAttribute("data-id");
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
      console.log("Cantidad no válida");
      return;
    }
    console.log("productId:", productId);
    fetch(`/shop/item/${productId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cantidadSeleccionada: quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        actualizarListaCarrito(data);
        if (data.redirectTo) {
          window.location.href = data.redirectTo; // Redirige a la URL proporcionada por el servidor
        }
      })
      .catch((error) => {
        // Muestra un mensaje de error al usuario
        console.log("Error al agregar producto al carrito: " + error);
      });
  });

  const add = document.querySelector("#add");
  const subtract = document.querySelector("#subtract");

  add.addEventListener("click", () => {
    if (quantityInput.value < 10) {
      quantityInput.value = Number(quantityInput.value) + 1;
    }
  });

  subtract.addEventListener("click", () => {
    if (quantityInput.value > 0) {
      quantityInput.value = Number(quantityInput.value) - 1;
    }
  });

  function actualizarListaCarrito(listaCarrito) {
    const carritoListaElement = document.getElementById("carrito-lista");
    // Verificar si el elemento existe antes de intentar modificar su contenido
    if (carritoListaElement) {
      // Limpiar el carrito
      carritoListaElement.innerHTML = "";
      // Renderizar la nueva lista del carrito
      listaCarrito.forEach((item) => {
        if (item.product_name && item.cantidad) {
          const carritoItem = document.createElement("div");
          carritoItem.innerHTML = `<p>${item.product_name} - Cantidad: ${item.cantidad}</p>`;
          carritoListaElement.appendChild(carritoItem);
        } else {
          console.error("Elemento de listaCarrito inválido:", item);
        }
      });
    }
  }
  
    // Tu código actual aquí...
    
});
// carrito.js
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
