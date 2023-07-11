/* 
Objetos
Tarea 1
Crea un objeto que describa un boleto de tren y guárdalo en la variable ticket. El objeto debe tener tres campos:
estación inicial (el nombre clave es from, y como valor, proporciona el nombre de la estación más cercana en tu área)
estación final (el nombre clave es to, y como valor, dar cualquier otra estación dentro de 100 km)
el precio del boleto (el nombre clave es price, y como valor, proporciona la cantidad que te gustaría pagar por este boleto)
El objeto debe crearse usando llaves {}, en los que todos los campos se enumerarán inmediatamente. Luego muestra los valores 
de todos los campos del ticket en la consola.

*/ 
console.log('Task 1 \n');

let ticket = {
    from : 'Somewhere',
    to : 'Somewhere else',
    price: 100,
}
console.log (`Estación inicial: ${ticket.from} \nEstación final: ${ticket.to} \nPrecio del boleto: ${ticket.price} Bs.`)


function createTicket (origin, destiny, price){
    let ticket = {
        from: origin,
        to: destiny,
        price
    }
    return ticket
}
console.log (createTicket('CBBA', 'LP', 45))

/*
Task 2
Declara un objeto vacío y guárdalo en la variable person. Usando la notación de punto, 
agrega los campos name y surname al objeto ingresando tus datos como valores. Intenta mostrar 
los campos individuales en la consola.
*/
console.log('\n Task 2 \n');

let person = {}
person.name = 'Pablo'
person.surname = 'Maguiña'
console.log(`Name: ${person.name} \nSurname: ${person.surname} `)

/*
Arreglos
Tarea 3
Estamos creando una pequeña biblioteca de libros sobre programación en JavaScript. Tenemos tres libros y 
queremos preparar una lista de ellos. Almacenaremos tres datos de cada libro: el título, el autor 
y el número de páginas:
Speaking JavaScript, Axel Rauschmayer, 460;
Programming JavaScript Applications, Eric Elliott, 254;
Understanding ECMAScript 6, Nicholas C. Zakas, 352.
Crea un arreglo de tres objetos que representen los libros. Cada objeto debe tener las siguientes propiedades: 
title, author, pages
*/
console.log('\n Task 3 \n');

let library = [
    {
        title: 'Speaking JavaScript',
        author: 'Axel Rauschmayer',
        pages: 460
    },
    {
        title: 'Programming JavaScript Applications',
        author: 'Eric Elliott',
        pages: 254
    },
    {
        title: 'Understanding ECMAScript 6',
        author: 'Nicholas C. Zakas',
        pages: 352
    },
]
console.log(library)

/*
Tarea 4
Agregar un nuevo libro a la colección: Learning JavaScript Design Patterns, 
por Addy Osmani, 254 páginas. Usa el método apropiado para adjunta el libro al final del arreglo.
Muestra la longitud del arreglo y, a su vez, todos los nombres de los libros en la colección.
*/
console.log('\n Task 4 \n');
let newBook = { 
    title:'Learning JavaScript Design Patterns',
    author: 'Addy Osmani',
    pages: 254
}

library.push(newBook)

console.log(`Library lenght: ${library.length}`)

library.map((book) => {console.log(book.title)})
//for (let book of library){console.log(book.title)}

/*
Task 5
Utiliza el comando slice para copiar los dos últimos libros al nuevo arreglo.
*/
console.log('\n Task 5 \n');

let librarySize = library.length
//let librarySlice = library.slice(librarySize-2,librarySize)

let librarySlice = library.slice(2,4)
console.log(librarySlice)

/*
Tarea 6
El primer libro de la colección se pierde en circunstancias inexplicables. 
Ya has aceptado la pérdida, así que ahora elimínalo del arreglo. 
¿Cuál método usarás para este propósito? Muestra la longitud del arreglo y 
todos los nombres de los libros de la colección a su vez.
*/
console.log('\n Task 6 \n');
const lostBook = library.shift()
console.log(`Library lenght: ${library.length}`)
library.map((book) => {console.log(book.title)})

/*
Tarea 7
Muestra la suma de las páginas de todos los libros de la colección.
*/
console.log('\n Task 7 \n');

let totalPages = 0
library.map((book) => { totalPages += book.pages })
console.log(`Sin el libro perdido el total de páginas es: ${totalPages}`)

library.unshift(lostBook)
totalPages = 0
library.map((book) => { totalPages += book.pages })
console.log(`Con el libro perdido el total de páginas es: ${totalPages}`)
