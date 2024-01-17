
document.addEventListener('DOMContentLoaded', ()=>{
    const addToCartButton= document.getElementById('addToCart');
    const quantityInput = document.getElementById('quantity');

    addToCartButton.addEventListener('click',()=>{
        const productId = addToCartButton.getAttribute('data-id');
        const quantity = parseInt(quantityInput.value);

        //envia una solicitud al servidor para agregar el producto al carrito

        fetch(`/item/add/${productId}`, {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify({cantidadSeleccionada:quantity})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            //meneja la respuesta del servidor si es necesario
            console.log(data)
            actualizarListaCarrito(data);
        })
        .catch(error =>{
            console.log(" error al agregar producto al carrito: " + error)
        })
    })
})













 const add = document.querySelector("#add");
 const subtract = document.querySelector("#subtract");


 add.addEventListener('click', () => {
         quantity.value = Number(quantity.value) + 1;

    }
);

subtract.addEventListener('click', () => {
     if (quantity.value > 0) {
        quantity.value = Number(quantity.value) - 1;
    }
 });

 function actualizarListaCarrito(listaCarrito){
    const carritoListaElement = document.getElementById('carrito-lista')
    // limpia el carrito
    carritoListaElement.innerHTML='';

    //renderizar la nueva lista del carrito

    listaCarrito.forEach(item => {
        const carritoItem = document.createElement('div');
        carritoItem.innerHTML=`
        <p>${item.product_name} - Cantidad: ${item.cantidad}</p>
        `;
        carritoListaElement.appendChild(carritoItem);
    });
 }
// const quantity = document.querySelector("#quantity");
// const stockElement = document.getElementById('product_stock');
// const priceItem = document.getElementById('price');
// const addToCartButton = document.querySelector("#addToCart");
// const carrito = [];
// const stockValue = parseInt(stockElement.textContent.match(/\d+/)[0]);

// addToCartButton.addEventListener('click', () => {
//     actualizarCarrito();
//     quantity.value = 0

//     // Puedes agregar aquí más acciones, como mostrar un mensaje de éxito, etc.
// });

// function actualizarCarrito() {
//     const productId = addToCartButton.dataset.id;
//     const cantidadSeleccionada = parseInt(quantity.value);
//     const precioUnitario = parseFloat(priceItem.textContent.match(/\d+\.\d+/)[0]);
//     let stockValue = parseInt(stockElement.textContent.match(/\d+/)[0]);

//     // Verificar si el producto ya está en el carrito
//     const productoExistente = carrito.find(item => item.id === productId);

//     if (productoExistente) {
//         // Actualizar la cantidad si el producto ya está en el carrito
//         productoExistente.cantidad += cantidadSeleccionada;
//         productoExistente.subTotal = productoExistente.cantidad * precioUnitario;
//         productoExistente.stock -= cantidadSeleccionada;
//         stockValue -= cantidadSeleccionada;
//     } else {
//         // Agregar nuevo producto al carrito
//         const productoActual = {
//             id: productId,
//             cantidad: cantidadSeleccionada,
//             precioUnitario: precioUnitario,
//             subTotal: cantidadSeleccionada * precioUnitario,
//             stock: stockValue - cantidadSeleccionada
//         };
//         carrito.push(productoActual);
//         stockValue -= cantidadSeleccionada;
//     }

//     // Actualizar el contenido del elemento stockElement
//     stockElement.textContent = (stockValue <= 0) ? 'No hay más stock' : `Stock: ${stockValue}`;
//     add.disabled = (stockValue <= 0);

//     // Lógica adicional para actualizar la interfaz del carrito si es necesario
//     console.log('Carrito actualizado:', carrito);
// }

// // add.addEventListener("click", () => {
// //     quantity.value = Number(quantity.value) + 1;
// //     if (quantity.value > 0) {
// //         cont++;
// //         const totalPrecio = precio * cont;
// //         total.textContent = `$ ${totalPrecio.toFixed(2)}`;
// //         totalAPagar.textContent= `$ ${totalPrecio.toFixed(2)}`;
// //         subTotal.textContent= `$ ${totalPrecio.toFixed(2)}`;
// //         cantidad.textContent= cont;
// //         nCantidad.textContent= cont;

// //     }
// //     console.log("Total actualizado: " + total.textContent);
// //     console.log("Total : " + totalAPagar.textContent);
// // })

// // subtract.addEventListener("click", () => {
// //     if (quantity.value > 0) {
// //         quantity.value = Number(quantity.value) - 1;
// //         cont--;
// //         const totalPrecio = precio * cont;
// //         total.textContent = `$ ${totalPrecio.toFixed(2)}`;
// //         totalAPagar.textContent= `$ ${totalPrecio.toFixed(2)}`;
// //         subTotal.textContent= `$ ${totalPrecio.toFixed(2)}`;
// //         cantidad.textContent= cont;
// //         nCantidad.textContent= cont;



// //     } else if (quantity.value == 1) {
        
// //         quantity.value = 0;
// //         total.textContent =`$ ${precio * cont}`
// //     }
// //     console.log("Total actualizado: " + total.textContent);
// // });

// // const btnPagar = document.querySelector('#btnPagar')

// // btnPagar.addEventListener('click',()=>{
// //    alert(`gracias por la compra de ${cont} productos su pago fue de ${totalAPagar.textContent}`)
// // })


