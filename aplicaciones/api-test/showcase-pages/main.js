const container = document.querySelector('.container')
const URLquery = window.location.search
//console.log(URLquery)
const params = new URLSearchParams(URLquery)
//console.log(params.keys().next())
const id = + params.get('id')
let BASE_URL = formatBaseURL(id)
console.log(BASE_URL)


/**
 * Esta funcion formatea la url a la que se realizarán las peticiones, en este caso mediante el id 
 * insertado como parámetro
 * @param {Number} id 
 * @returns {String} - Devuelve la URL con su respectivo formato
 */
function formatBaseURL(id){
    let url = 'https://rickandmortyapi.com/api/character/'
    if(id===2) url = 'https://rickandmortyapi.com/api/location/'
    if(id===3) url = 'https://rickandmortyapi.com/api/episode/'
    return url
}



/**
 * Esta función  realiza la petición de los datos a la API 
 * @param { string } page  
 * @returns { object } - El resultado de realizar la peticion
 */
async function requestDataPage (page){
    const response = await fetch(`${BASE_URL}?page=${page}`)
    const data = await response.json()
    return data
}

function buildCharacterContent(results){
    results.map((character)=>{
        const card = document.createElement('div')
        card.className = 'card'
        const image = document.createElement('img')
        image.src = character.image
        card.appendChild(image)
        const content = document.createElement('div')
        content.className = 'content'
        content.appendChild(buildCardContent('Name: ', character.name))
        content.appendChild(buildCardContent('Status: ', character.status))
        content.appendChild(buildCardContent('Species: ', character.species))
        content.appendChild(buildCardContent('Gender: ', character.gender))
        content.appendChild(buildCardContent('Origin: ', character.origin.name))
        content.appendChild(buildCardContent('Location: ', character.location.name))
        card.appendChild(content)
        container.appendChild(card)
    })
}

function buildLocationContent(results){
    results.map((location)=>{
        const card = document.createElement('div')
        card.className = 'card'
        const content = document.createElement('div')
        content.className = 'content'
        content.appendChild(buildCardContent('Name: ', location.name))
        content.appendChild(buildCardContent('Type: ', location.type))
        content.appendChild(buildCardContent('Dimension: ', location.dimension))
        card.appendChild(content)
        container.appendChild(card)
    })
}

function buildEpisodeContent(results){
    results.map((episode)=>{
        const card = document.createElement('div')
        card.className = 'card'
       
        const content = document.createElement('div')
        content.className = 'content'
        content.appendChild(buildCardContent('Name: ', episode.name))
        content.appendChild(buildCardContent('Air Date: ', episode.air_date))
        content.appendChild(buildCardContent('Episode: ', episode.episode))
        card.appendChild(content)
        container.appendChild(card)
    })
}

/**
 * Esta función construye un elemento html de la clase content
 * @param {string} title 
 * @param {string} data 
 * @returns {object} - El cual es el elemento HTML que podremos insertar en nuestro documento
 */
function buildCardContent(title, data){
    const content = document.createElement('div')
    content.className = 'characteristics'
    const titleElement = document.createElement('span')
    const dataElement = document.createElement('p')
    titleElement.innerHTML = title
    dataElement.innerHTML = data
    content.appendChild(titleElement)
    content.appendChild(dataElement)
    return content
}

// requestDataPage('').then((data)=>{
//     console.log(data);
//     buildCharacterContent(data.results)
// })

// requestDataPage('').then((data)=>{
//     console.log(data);
//     buildLocationContent(data.results)
// })

// requestDataPage('').then((data)=>{
//     console.log(data);
//     buildEpisodeContent(data.results)
// })

function buildPagination(pages){
    // while (container.firstChild) {
    //     container.removeChild(container.firstChild);
    // }
    for(let i = 1; i<=pages; i++){

    }
}

/**
 * Esta funcion se ejecuta la primera vez que se visita una sección
 * basicamente setea la primera vista y la paginación
 * @param {function} buildFunction 
 */
function setup(buildFunction){
    requestDataPage('').then((data)=>{
        console.log(data)
        buildPagination()
        buildFunction(data.results)
    })
}

function init(){
    switch (id){
        case 1:
    }
}

// fetch('./test.json').then(response => response.json())
//                     .then(data=>{
//                         console.log(data)
//                         buildCharacterContent(data.results)
//                     })