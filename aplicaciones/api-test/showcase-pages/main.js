/**
 * Handler del contenedor para los resultados
 */
const container = document.querySelector('.container')

/**
 * Handlers para el paginador
 */
const backArrow = document.querySelector('#back')
let backListener = false
const pageHtml = document.querySelector('#page')
const forwardArrow = document.querySelector('#forward')
let forwardListener = false

/**
 * Configuración guiada por parametros de la URL
 */
const URLquery = window.location.search
//console.log(URLquery)
const params = new URLSearchParams(URLquery)
//console.log(params.keys().next())
const id = + params.get('id')
let BASE_URL = formatBaseURL(id)

/**
 * Variables del paginador
 */
let currentPage = 1
let totalPages = 0

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

/**
 * Esta funcion se encarga de construir la vista de cada una de las tarjetas
 * por elemento obtenido mediante las peticiones a la api, en este caso 
 * tarjetas con personajes
 * @param {object} results 
 */
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

/**
 * Esta funcion se encarga de construir la vista de cada una de las tarjetas
 * por elemento obtenido mediante las peticiones a la api, en este caso 
 * tarjetas con locaciones
 * @param {object} results 
 */
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

/**
 * Esta funcion se encarga de construir la vista de cada una de las tarjetas
 * por elemento obtenido mediante las peticiones a la api, en este caso 
 * tarjetas con episodios
 * @param {object} results 
 */
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
 * es basicamente un contenedor para cada atributo de cada elemento
 * @param {string} title 
 * @param {string} data 
 * @returns {object} - El cual es el elemento HTML que podremos insertar en nuestro documento
 */
function buildCardContent(title, data){
    const content = document.createElement('div')
    content.className = 'characteristics'
    content.innerHTML  = `<span> ${title} </span> <p> ${data} </p>`
    return content
}

/**
 * Esta función otorga el valor de páginas totales tras el setup
 * de la página
 * @param {Number} pages 
 */
function buildPagination(pages){
    totalPages = pages
}

/**
 * Esta función es la que se ejecuta al hacer click sobre alguna de las flechas
 * el parametro forward es true si es la flecha de la derecha y falso si es la otra
 * @param {Boolean} forward 
 * @returns 
 */
function changePage(forward){
    currentPage --
    if(forward) currentPage += 2
    if (currentPage > totalPages || currentPage < 1) return
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const buildFunction = getBuildingFunction()
    requestDataPage(`${currentPage}`).then((data)=>{
        buildFunction(data.results)
    })
    changePageLabel()
    changeArrows()
}

/**
 * Esta función se encarga de cambiar el contenido del texto del paginador
 */
function changePageLabel(){
    pageHtml.innerHTML = `Página ${currentPage}`
}

/**
 * Esta función se encarga de otorgar o quitar la funcionalidad a las flechas
 * dependiendo de la página actual en la que se encuentre el usuario
 * además de cambiar el aspecto de las mismas
 */
function changeArrows(){
    if(currentPage == 1){
        backArrow.classList.replace('back-active','back')
        if (backListener){
            backArrow.removeEventListener('click',()=>{
                changePage(false)
            })
            backListener = false
        }
    }
    if (currentPage > 1){
        backArrow.classList.replace('back', 'back-active')
        if (!backListener){
            backArrow.addEventListener('click',()=>{
                changePage(false)
            })
            backListener = true
        }
    }
    if(currentPage < totalPages){
        forwardArrow.classList.replace('forward', 'forward-active')
        if (!forwardListener){
            forwardArrow.addEventListener('click',()=>{
                changePage(true)
            })
            forwardListener = true
        }
    }
    if(currentPage === totalPages){
        forwardArrow.classList.replace('forward-active','forward')
        if (forwardListener){
            forwardArrow.removeEventListener('click',()=>{
                changePage(true)
            })
            forwardListener = false
        }
    }
}

/**
 * Funcion para hacer scroll hasta arriba
 */
function scrollFunction(){
    window.scrollTo(0,0)
}

/**
 * Esta funcion se ejecuta la primera vez que se visita una sección
 * basicamente setea la primera vista y la paginación
 * @param {function} buildFunction 
 */
function setup(buildFunction){
    requestDataPage('').then((data)=>{
        buildPagination(data.info.pages)
        changeArrows()
        buildFunction(data.results)
    })
}

/**
 * Esta función devuelve la función de construcción correspondiente al parametro id
 * que tiene nuestra página al cargar
 * @returns {function}
 */
function getBuildingFunction(){
    switch (id){
        case 1:
            return buildCharacterContent
        case 2:
            return buildLocationContent
        case 3:
            return buildEpisodeContent
    }
}

/**
 * Función inicial
 */
function init(){
    setup(getBuildingFunction())
}

init()