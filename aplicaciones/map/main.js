const field = document.querySelector('.field')
const message = document.querySelector('.message')
const button = document.querySelector('.button')
let chest = document.querySelector('.chest')

/**
 * Estas variables manejan el estado de: El campo de juego, el tesoro y los sectores
 * explorados; además de la cantidad de clicks realizados
 */
let chestRect       = {}
let fieldRect       = {}
let lastClickRect   = {}
let chestCenter     = {}
let clicks          = 0

/** 
 * Objeto con las distancias representadas con colores
*/
const proximityColors = {
    veryclose:      '#AFFC41',
    close:          '#AFD5AA',
    considerable:   '#F0EC57',
    far:            '#F56416',
    veryfar:        '#EF271B',
}

/**
 * Esta función realiza las configuraciones basicas para el inicio de cualquier juego:
 * limpiar los campos creados al hacer clicks, reiniciar contador de clicks, cambiar mensaje,
 * cambiar texto del botón, configurar el campo y el tesoro
 * @param ()
 * @returns 
 */
function init() {
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    clicks = 0
    setMessage('Juego en curso, pulsa el boton debajo por si quieres reiniciar')
    setButton('Pulsa para reiniciar')
    setField()
    setChest()
}

/**
 * Esta función obtiene el estado del campo de juego y lo asigna a la variable fieldRect
 * además de agregarle el eventListener para jugar
 * @param ()
 * @returns
 */
function setField() {
    fieldRect = field.getBoundingClientRect()
    if (field) field.addEventListener('click', handleClick)
}

/**
 * Esta función crea un tesoro en una posición aleatoria dentro del campo de juego y almacena su estado en las variables
 * chestRect y chestCenter
 * @param ()
 * @returns
 */
function setChest() {
    if (chest === null) {
        chest = document.createElement('div')
        chest.className = 'chest'
    }
    chest.style.visibility = 'hidden'
    const x = Math.random() * (fieldRect.width - 30 - 30) + 30
    const y = Math.random() * (fieldRect.height - 30 - 30) + 30
    chest.style.top = `${y}px`
    chest.style.left = `${x}px`

    field.appendChild(chest)

    chestRect = chest.getBoundingClientRect()
    chestCenter = {
        x: chestRect.left + 15,
        y: chestRect.top + 15
    }
}

/**
 * Esta función cambia el nombre del mensaje encima del mapa
 * @param {string} - El texto que será puesto encima del mapa
 * @returns
 */
function setMessage(text) {
    message.innerHTML = text
}

/**
 * Esta función cambia el nombre del mensaje del botón
 * @param {string} - El texto que será puesto dentro del botón
 * @returns
 */
function setButton(message) {
    button.innerHTML= message
}

/**
 * Esta función maneja el evento del mouse al hacer click dentro del mapa
 * @param {object} event 
 * @returns 
 */
function handleClick(event) {
    clicks++
    let x = event.clientX
    let y = event.clientY
    let spot = document.createElement('div')
    spot.className = 'spot'
    spot.style.top = `${y - fieldRect.top - 18.5}px`
    spot.style.left = `${x - fieldRect.left - 18.5}px`
    field.appendChild(spot)
    lastClickRect = spot.getBoundingClientRect()
    if(checkCollision(lastClickRect, chestRect)) {
        handleWin()
        return
    }
    console.log(checkDistance(x,y))
    const proximity = checkDistance(x,y)
    spot.style.borderColor = proximity

}

/**
 * Esta función se ejecuta cuando se encuentra el tesoro, modificando el mensaje y mostrandolo
 * en la parte de arriba
 * @param ()
 * @returns
 */
function handleWin(){
    chest.style.visibility = 'visible'
    console.log('removiendo');
    field.removeEventListener('click', handleClick)
    setMessage(`Felicidades, lograste encontrar el tesoro en ${clicks} clicks`)
    setButton('Pulsa para iniciar')
}

/**
 * Esta función evalúa la distancia que existe entre el ultimo click realizado sobre el mapa y
 * el centro del cofre
 * @param {number} x - Coordenada X del click realizado
 * @param {number} y - Coordenada Y del click realizado
 * @returns {string} - Devuelve el HEX para el marcador generado por el click dependiendo de la distancia al cofre desde la que fue realizado
 */
function checkDistance(x,y){
    let distance = Math.sqrt(Math.pow((x-chestCenter.x),2) + Math.pow(y-chestCenter.y,2))
    if (distance < 80) return proximityColors.veryclose
    if (distance < 150) return proximityColors.close
    if (distance < 300) return proximityColors.considerable
    if (distance < 600) return proximityColors.far
    if (distance > 600) return proximityColors.veryfar
}

/**
 * Debido a que se genera un rectángulo cada vez que se realiza un click (el tesoro tambien es un rectangulo), es 
 * necesario evaluar la colisión entre ambos para verificar si se encontró el tesoro o no.
 * Basicamente se evalua si estos rectangulos intersectan en algun punto
 * @param {object} rect1 
 * @param {object} rect2 
 * @returns {boolean} - True si existe colisión
 */
function checkCollision(rect1, rect2){
    if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) return true
    return false
}

let a = [1,2,3]
let r = a.forEach(num=>{return num})
console.log(r);