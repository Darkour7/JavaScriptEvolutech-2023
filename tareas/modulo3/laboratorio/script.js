const contactos = []
function crearContacto(){
    let nombre = '';
    while(nombre.length === 0){
        nombre = prompt('Ingrese un nombre: ')
    }

    let numero = '';
    while(numero.length === 0){
        numero = prompt('Ingrese un numero: ')
    }

    const contacto = {
        nombre,
        numero
    }

    contactos.push(contacto);
    console.log(contactos);

    const contactField = document.createElement('div')

    const nameItem = document.createElement('span')
    const numberItem = document.createElement('span')

    nameItem.innerHTML = nombre
    numberItem.innerHTML = numero

    contactField.appendChild(nameItem)
    contactField.appendChild(numberItem)

    const total = document.getElementById('contacts-area')
    total.appendChild(contactField)

}