const responseField = document.getElementById('text-field')
const body = document.getElementById('body')

function initGame(){
    const randomNumber = Math.floor(Math.random()*100+1)
    changeBackground('#006992')
    setTimeout(function() {
        play(randomNumber)
    }, 100);
}

function play(targetNumber){
    let attempts = 10
    let promptMessage = 'Adivina el número entre 1 y 100'
    let lastAttempt = ''
    let quit = false
    while (attempts > 0){
        alert(`Intentos restantes: ${attempts}`)
        let data = prompt(promptMessage, lastAttempt)
        if(data === null) { 
            quit = true
            break 
        }
        data = parseInt(data)
        if (isNaN(data) || data > 100 || data < 1){
            alert('Ingrese un dato válido')
            continue
        }
        if (data == targetNumber){
            responseBuilder(`¡Felicidades! Adivinaste el número en ${11-attempts} intentos`)
            changeBackground('#7BE0AD')
            break
        }
        data > targetNumber ? 
        promptMessage = 'El número ingresado es mayor' :
        promptMessage = 'El número ingresado es menor'
        lastAttempt = data
        attempts--
    }
    if (quit) {
        changeBackground('#A71D31')
        responseBuilder('Presiona el botón para iniciar el juego')
    }
    if (attempts == 0) {
        changeBackground('#FF5A5F')
        responseBuilder('Mala suerte, no lograste adivinar el número')
    }
}


function responseBuilder(message){
    responseField.innerHTML=message
}

function changeBackground(color){
    body.style.backgroundColor = color
}