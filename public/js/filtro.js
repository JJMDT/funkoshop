function handleChange() {
    let select = document.getElementById('viewType');
    var selectedValue = select.options[select.selectedIndex].value;

    window.location.href = "/admin/" + selectedValue;
}


    document.getElementById('category').addEventListener('change', function() {
        // Obtén el valor seleccionado de la categoría
        var selectedCategoryId = this.value;

        // Obtén el elemento de la lista de licencias
        var licenceSelect = document.getElementById('licence');

        // Borra las opciones actuales
        licenceSelect.innerHTML = '';

        // Itera sobre las filas del resultado de la consulta
        results.forEach(row => {
            // Agrega todas las licencias sin verificar la categoría seleccionada
            var option = document.createElement('option');
            option.value = row.licence_id;
            option.text = row.licence_name;
            licenceSelect.add(option);
        });
    });

