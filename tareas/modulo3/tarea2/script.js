function obtenerResultado() {
    prompt('hola');
    let ancho = Number(document.getElementById('ancho').value);
    let altura = Number(document.getElementById('altura').value);
    let longitud = Number(document.getElementById('longitud').value);

    if (isNaN(ancho) || isNaN(altura) || isNaN(longitud)) {
        alert('Ingrese solo números');
    }

    if (ancho < 0 || altura < 0 || longitud < 0) {
        alert('Ingrese valores válidos');
    }

    const volumen = ancho * altura * longitud;

    let resultField = document.getElementById('result');
    console.log(resultField);
    if (resultField === null) {
        resultField = document.createElement('h3');
        resultField.innerHTML = `El volumen es ${volumen}`;
        resultField.id = 'result'
        const formField = document.getElementById('form');
        formField.appendChild(resultField);
        return;
    }

    resultField.innerHTML= `El volumen es ${volumen}`

   
}

