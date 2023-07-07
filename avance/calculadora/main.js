/*
    Casos de error de sintaxis
        -En números
            -> Mas de un punto decimal en el mismo numero
        -En signos
            -> "23-*12"
            -> "3+/2"
            -> "3("
*/
function evaluateOperation(input) {
    try{
        const checkRegex = /^[\d+*\-/().^]+$/
        const validado = checkRegex.test(input)
        if (!validado) {throw new Error('Caracteres invalidos detectados')}
        return(toOperatorArray(input, true))
    }catch(e){
        return(e.message)
    }
}

//input es la entrada, result el arreglo final y polarity es el simbolo final del resultado de evaluar los operandos
function toOperatorArray(input, polarity) {
    console.log('polaridad inicial: ', polarity);
    if(isSpecialSymbol(input.charAt(0)) || isSpecialSymbol(input.charAt(input.length-1))) { throw new Error('Syntax error') }
    let result = []
    let negativeFlag = false  //Simbolo del siguiente numero
    let specialFlag = false //Se encontró un simbolo especial
    for (let i = 0; i < input.length; i++) {
        let character = input[i]
        //Si es un número
        if (isNumber(character)) {
            const buildResult = buildNumber(input, i)
            i = buildResult.index-1
            let newNumber = parseFloat (buildResult.number)
            if (negativeFlag){
                newNumber = newNumber * (-1)
                negativeFlag = false
            }
            result.push(newNumber)
            if(specialFlag){ specialFlag = false}
            continue
        }
        //Si es un '*', '^', '/'
        if(isSpecialSymbol(character)){
            if(specialFlag){ throw new Error('Syntax error') }
            result.push(character)
            specialFlag= true
        }
        //Si es un '+' o un '-'
        const signEval = isSignSymbol(character) 
        if (signEval != -1){
            let polarityResult = evaluatePolarity(input,i)
            negativeFlag = !polarityResult.polarity
            index = polarityResult.index
        }
        //Si es un '('
        if(isOpenPharentesis(character)){
            const sectionResult = sectionInput(input, (i+1))
            i = sectionResult.index -1
            console.log('seccionado: ', sectionResult);
            result.push(toOperatorArray(sectionResult.sectioned,!negativeFlag))
            console.log('------------Resultado luego de parentesis', result);
            continue
        }
        //Si hay un ')' erroneo
        if(isClosePharentesis(character)) {throw new Error('Syntax error')}
    }
    console.log('DEBE EVALUARSE:', result)
    let finalResult = evaluate(result)
    console.log('SUMA FINAL DEL ARREGLO:', finalResult, 'con signo: ', polarity)
    if(!polarity) {return finalResult*-1}
    return finalResult
}

//Evaluacion final
function evaluate(operatorArray){
    console.log('arreglo a evaluar: ', operatorArray);
    //Evaluar potencias
    operatorArray = evaluateSpecialOperator(operatorArray, '^')
    console.log('arreglo a evaluar luego de la potencia: ', operatorArray);
    //Multiplicaciones
    operatorArray = evaluateSpecialOperator(operatorArray, '*')
    console.log('arreglo a evaluar luego de la multiplicacion: ', operatorArray);
    //Divisiones
    operatorArray = evaluateSpecialOperator(operatorArray, '/')
    console.log('arreglo a evaluar luego de la division: ', operatorArray);
    let sum = 0;
    for (let i = 0; i < operatorArray.length; i++ ) {
        sum += operatorArray[i];
    }
    return sum
}

//Construccion de numeros
function buildNumber(input, index) {
    let finished = false
    let pointFlag = false
    let result = ''
    while (!finished && index < input.length) {
        let character = input[index]
        if (isNumber(character)) {
            result += character
            index++
            continue
        }

        if (character === '.') {
            if (pointFlag) {throw new Error('Syntax error')}
            result += character
            index++
            pointFlag = true
            continue
        }
        finished = true
    }
    if (result === '' || result === undefined){
        throw new Error('Syntax error')
    }

    return { number: result, index: index }
}

//Evaluacion de polaridad
function evaluatePolarity(input, index){
    let finalSymbol = true //-> true para positivo
    let finished = false
    while (!finished && index < input.length) {
        let character = input[index]
        if(isOpenPharentesis(character)) {
            break
        }
        if (!isNumber(character)){
            let checkSymbol = isSignSymbol(character)
            if(checkSymbol === -1) throw new Error('Syntax error')
            if(checkSymbol === 0) {
                finalSymbol = !finalSymbol
            }
            index++
            continue
        }
        finished = true
    }

    //overflow
    if (index >= input.length) throw new Error('Syntax error')
    return {polarity: finalSymbol, index: index}
}

//Evaluacion de parentesis
function sectionInput(input, index){
    console.log('Seccionando el siguiente input', input, 'desde el indice ', index)
    let aux = index
    let openCounter = 1
    let closingFlag = false
    let sectionedInput = ''
    while (!closingFlag && index < input.length) {
        character = input.charAt(index)
        if(isOpenPharentesis(character)){
            openCounter ++
        }
        if(isClosePharentesis(character)){
            openCounter --;
            if(openCounter == 0) {closingFlag = true}
        }
        index++
    }
    //overflow
    if (index > input.length) throw new Error('Syntax error')
    if(openCounter > 0) throw new Error('Syntax error')
    sectionedInput = input.substring(aux, index-1)
    return {sectioned: sectionedInput, index: ++index}
}

function evaluateSpecialOperator(array, operator){
    let regularArray = []
    let j = -1
    for(let i = 0; i<array.length; i++){
        let element = array[i]
        if(isSpecialSymbol(element) && element === operator){
            const preResult = operate(regularArray[j],  array[i+1], element)
            regularArray.shift()
            regularArray.push(preResult)
            i = i + 1
            continue
        }
        regularArray.push(element)
        j++
    }
    return regularArray
}

function isNumber(character) {
    return !isNaN(character)
}

function isSignSymbol(character){
    if (character === '+') return 1
    if (character === '-') return 0
    return -1 
}

function isSpecialSymbol(character){
    return character === '*' || character ==='^' || character ==='/'
}

function isOpenPharentesis(character){
    return character === '('
}

function isClosePharentesis(character){
    return character === ')'
}

const operate = (num1, num2, operador) => {
    const multiplication = (a, b) => a * b
    const division = (a, b) => a / b 
    const power = (a, b) => a ** b
    console.log('numero1:' , num1, 'numero2:' , num2, 'operador', operador)
    const operaciones = { '^': power, '*': multiplication, '/': division }
    console.log(operaciones[operador])
    const result =  operaciones[operador](num1, num2)
    console.log('resultado pre operacion: ', result)
    if(!isFinite(result)){throw new Error('Math error')}
    return result
}

const screen = document.querySelector('#screen')

function typeToScreen(character){
    if(character === 'DEL') {
        var actual = screen.value
        var newValue = actual.slice(0, -1)
        screen.value = newValue
        return
    }
    if(character === 'AC') {
        screen.value = ''
        return
    }

    if(character === '='){
        let resultado = evaluateOperation(screen.value)
        screen.value = resultado
        return
    }

    screen.value += character
}

//evaluateOperation('2+2-(3)')
