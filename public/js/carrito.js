
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
    // Obtén el valor actual del input y el stock máximo permitido
    const currentQuantity = Number(quantityInput.value);
    const maxStock = parseInt(quantityInput.getAttribute("data-stock") || "0", 10);

  
    // Verifica si el valor actual es menor que el stock máximo antes de incrementarlo
    if (currentQuantity < maxStock) {
      quantityInput.value = currentQuantity + 1;
    }
    document.getElementById('cantidadCarrito').innerHTML = `${totalProductos}`;


  });
  

  subtract.addEventListener("click", () => {
    if (quantityInput.value > 0) {
      quantityInput.value = Number(quantityInput.value) - 1;
    }
    
  });

  function actualizarListaCarrito(data) {
    const carritoListaElement = document.getElementById("carrito-lista");
    const cantidadCarritoElement = document.getElementById("cantidadCarrito");
  
    if (carritoListaElement && cantidadCarritoElement) {
      // Limpiar el carrito
      carritoListaElement.innerHTML = "";
  
      // Renderizar la nueva lista del carrito
      data.carrito.forEach((item) => {
        if (item.product_name && item.cantidad) {
          const carritoItem = document.createElement("div");
          carritoItem.innerHTML = `<p>${item.product_name} - Cantidad: ${item.cantidad}</p>`;
          carritoListaElement.appendChild(carritoItem);
        } else {
          console.error("Elemento de listaCarrito inválido:", item);
        }
      });
  
      // Actualizar la cantidad total en el carrito
      cantidadCarritoElement.innerHTML = data.carrito.length;
    }
  }
})
  
//     // Tu código actual aquí...
//    