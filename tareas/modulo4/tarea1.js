//-----------------Tarea1------------------------------

// let number = 100
// while (number >= 0){
//     console.log(number)
//     number -= 10
// }

//-----------------Tarea2------------------------------

function decreasingNumber(){
    let higher = Number(prompt("Ingrese el primer número: "))
    let lower = Number(prompt("Ingrese el segundo número: "))
    let decrease = Number(prompt("Ingrese el numero sustractor: "))
    let result;
    try{
        result = executeDecrease(higher, lower, decrease)
    }catch(error){
        console.error(error)
        result = error.message
    }finally{
        const box = document.getElementById('result')
        box.innerHTML = result;
    }
}

function executeDecrease(number1, number2, decreaseConstant){
    try{
        if (decreaseConstant<=0) {throw new Error("El numero de decremento debe ser mayor a cero")}
        if (number2 > number1) {throw new Error("El segundo numero debe ser menor al primero")}
        let result = []
        while(number1 >= number2){
            result.push(number1)
            number1 -= decreaseConstant
        }
        return result 
    }catch(error){
        throw error
    }

}

//----------------Tarea3----------------------
// let numbers = [21, 45, 100, 12, 11, 78, 61, 4, 39, 22];

// //Todos
// numbers.map((number)=>{ console.log(number)})
// console.log("-----------------------------");

// //Pares
// numbers.map((number)=>{ 
//     if (number %2 ==0) console.log(number);
// })

// console.log("-----------------------------");
// //>10 y <60
// numbers.map((number)=>{ 
//     if (number > 10 && number < 60) console.log(number)
// })
// console.log("-----------------------------");


//----------------Tarea4----------------------

let movies = []
function movieInput(){
    let name
    let imdb
    let flag = true;
    
    while (flag){
        name = prompt('Ingrese el nombre de la película...')
        imdb = prompt('Ingrese la calificación de la película...')
        try{

            flag = evaluateMovie(name,imdb,movies)
        }catch(error){
            console.error(error.message);
        }
    }

    console.log(movies);
    let lowRated = []
    let highRated = []
    for(let movie of movies){
        if (movie.rating<7) {
            lowRated.push(movie)
        }
        if (movie.rating>=7) {
            highRated.push(movie)
        }
    }
}

function evaluateMovie(name, imdb, movies){
    if (name === null || imdb === null) return false;
    imdb = Number(imdb)
    if (isNaN(imdb)) throw new Error ("La calificación debe ser solamente un número");
    if (imdb < 0 || imdb>10) throw new Error ("La calificación debe ser mayor a 0 y menor o igual a 10 ")    
    let newMovie = {
        name: name,
        rating: imdb
    }
    movies.push(newMovie)
    return true
}