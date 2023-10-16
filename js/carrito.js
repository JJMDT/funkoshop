const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const quantity = document.querySelector("#quantity");
const total = document.querySelector("#total");
let cont = 0;
let precio= 1799;

add.addEventListener("click", () => {
    quantity.value = Number(quantity.value) + 1;
    if (quantity.value > 0) {
        cont++;
        const totalPrecio = precio * cont;
        total.textContent = `$ ${totalPrecio.toFixed(2)}`;
    }
    console.log("Total actualizado: " + total.textContent);
})

subtract.addEventListener("click", () => {
    if (quantity.value > 0) {
        quantity.value = Number(quantity.value) - 1;
        cont--;
        const totalPrecio = precio * cont;
        total.textContent = `$ ${totalPrecio.toFixed(2)}`;

    } else if (quantity.value == 1) {
        
        quantity.value = 0;
        total.textContent =`$ ${precio * cont}`
    }
    console.log("Total actualizado: " + total.textContent);
});
