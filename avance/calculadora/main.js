const screen = document.querySelector('#screen')

/**
 * Esta funcion controla el accionar de cada botón de la calculadora
 * Solo realiza cambios en el input y en caso de ser introducido el boton '='
 * se evalua la expresión
 * @param {string} character 
 * @returns 
 */

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
        let resultado = calculate(screen.value)
        screen.value = resultado
        return
    }

    screen.value += character
}

/**
 * Es el punto de entrada que se ejecuta al presionar el botón '=' en la calculadora
 * Se evalua que la entrada tenga caracteres válidos
 * @param {string} input - Es basicamente el parámetro recuperado de la pantalla de la calculadora 
 * @returns {number} - el cual es el resultado de evaluar la expresión ingresada
 */
function calculate(input) {
    try{
        const checkRegex = /^[\d+*\-/().^]+$/
        const validado = checkRegex.test(input)
        if (!validado) {throw new Error('Caracteres invalidos detectados')}
        return(toOperatorArray(input, true))
    }catch(e){
        return(e.message)
    }
}

/**
 * Este metodo lleva una expresión matemática a un arreglo de operandos, por ejemplo:
 * 2+-5/(2*3+(5^1))    ----->    [2,-5,'/',toOperatorArray('2*3+(5^1')]   <- Recursividad básica
 *                     ----->    [2,-5,'/',[2,'*',3,toOperatorArray(5^1')]]
 *                     ----->    [2,-5,'/',[2,'*',3,[5,'*',1]]]
 * @param {string} input - La cadena que debe ser parseada
 * @param {boolean} polarity - El simbolo final que se le va a asignar al arreglo
 * @throws {Error} - Para errores de sintaxis y problemas con los parentesis
 * @returns {number} - El resultado de pasar el arreglo por la funcion evaluate
 */
function toOperatorArray(input, polarity) {
    console.log('EVALUANDO INPUT:', input, 'Con polaridad inicial: ', polarity)
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
            i = polarityResult.index -1
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
        if(isClosePharentesis(character)) {throw new Error('Asociation error')}
    }
    console.log('APLICAR OPERACIONES SOBRE :', result)
    let finalResult = evaluate(result)
    console.log('RESULTADO FINAL:', finalResult, 'con signo: ', polarity)
    if(!polarity) {return finalResult*-1}
    return finalResult
}

/**
 * Esta funcion evalua las operaciones en el orden comun establecido
 * , pero solo de los siguientes operandos (omitiendo los parentesis):
 * Potencias, multiplicación, división 
 * Finalmente se suman todos los valores del arreglo
 * @param {array} operatorArray - El arreglo de operandos que debe operarse
 * @returns {number} - Resultado de Evaluar el arreglo
 */
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

/**
 * Esta función auxiliar se ejecuta en la iteración principal (toOperatorArray())
 * Se activa cuando se detecta un caracter numérico y busca obtener el numero completo
 * hasta el siguiente signo que aparezca o hasta que se acabe la cadena a evaluar
 * Toma en cuenta los puntos decimales
 * @param {string} input - La cadena evaluada en cuestion
 * @param {number} index - El indice desde el que se empieza a recuperar el numero
 * @throws {Error} - Devuelve un error de sintaxis si se detecta un "doble punto" en el numero construido
 * @returns {object} - Con dos parametros: El numero construido, y el indice de la cadena en el que termina
 */
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


/**
 * Esta funcion auxiliar se ejecuta en la iteración principal (toOperatorArray())
 * Se activa cuando se detecta el simbolo + o - y busca absorber las sucesiones de
 * estas, por ejemplo: ---+2
 * @param {string} input - La cadena evaluada en cuestion
 * @param {number} index - El indice desde el que se empieza a evaluar los signos
 * @throws {Error} - Devuelve un error de sintaxis si se detecta un simbolo no deseado en la sucesión (*,/,^)
 * @returns {object} - Con dos parametros: El signo final, y el indice de la cadena en el que termina
 */
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
            if(checkSymbol === 0) finalSymbol = !finalSymbol
            index++
            continue
        }
        finished = true
    }

    //overflow
    if (index >= input.length) throw new Error('Syntax error')
    return {polarity: finalSymbol, index: index}
}

/**
 * Esta funcion auxiliar se ejecuta en la iteración principal (toOperatorArray())
 * Se activa cuando se detecta un parentesis abierto y busca seccionar estas asociaciones
 * en forma de cadena para que puedan evaluarse primero
 * @param {string} input - La cadena evaluada en cuestion
 * @param {number} index - El indice desde el que se empieza a evaluar el contenido de los parentesis
 * @throws {Error} - Devuelve un error de asociación si se detecta que el parentesis inicial no tiene uno de cierre o si el contenido presenta ese caso
 * @returns {object} - Con dos parametros: La cadena contenida dentro de los parentesis, y el indice de la cadena en el que termina
 */
function sectionInput(input, index){
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
    if (index > input.length) throw new Error('Asociation error')
    if(openCounter > 0) throw new Error('Asociation error')
    sectionedInput = input.substring(aux, index-1)
    return {sectioned: sectionedInput, index: ++index}
}

/**
 * Esta funcion auxiliar se ejecuta en la funcion evaluate() y es basicamente el tratamiento de el arreglo de operandos
 * para los casos en los que exista el operando *, / o ^
 * @param {array} array 
 * @param {string} operator 
 * @returns {array} - El cual es el arreglo original con las expresiones evaluadas para el operador especificado
 */
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

/**
 * Esta funcion evalua si un caracter es numerico
 * @param {string} character 
 * @returns {boolean} - True si es numero 
 */
function isNumber(character) {
    return !isNaN(character)
}

/**
 * Esta funcion evalua si un caracter es un + o un -
 * @param {string} character 
 * @returns {number} - Devuelve -1 si no es ninguno
 */
function isSignSymbol(character){
    if (character === '+') return 1
    if (character === '-') return 0
    return -1 
}

/**
 * Esta funcion evalua si un caracter es un *, / o ^
 * @param {string} character 
 * @returns {boolean} - True si es alguno de estos simbolos
 */
function isSpecialSymbol(character){
    return character === '*' || character ==='^' || character ==='/'
}

/**
 * Esta funcion evalua si un caracter es un parentesis abierto
 * @param {string} character 
 * @returns {boolean} - True si es '('
 */
function isOpenPharentesis(character){
    return character === '('
}

/**
 * Esta funcion evalua si un caracter es un parentesis cerrado
 * @param {string} character 
 * @returns {boolean} - True si es ')'
 */
function isClosePharentesis(character){
    return character === ')'
}

/**
 * Esta funcion realiza la operación entre dos numeros, la operacion depende del parametro operator
 * @param {number} num1 
 * @param {number} num2 
 * @param {string} operator 
 * @throws {Error} - Devuelve un error matematico si se intenta dividir un numero entre cero o si se intenta "obtener la raiz" de un numero negativo
 * @returns {number} - devuelve el resultado de la operacion indicada
 */
const operate = (num1, num2, operator) => {
    const multiplication = (a, b) => a * b
    const division = (a, b) => a / b 
    const power = (a, b) => a ** b
    console.log('numero1:' , num1, 'numero2:' , num2, 'operador', operator)
    const operations = { '^': power, '*': multiplication, '/': division }
    const result =  operations[operator](num1, num2)
    if(!isFinite(result)){throw new Error('Math error')}
    return result
}

/*
    Casos de error de sintaxis:
        -En números
            -> Mas de un punto decimal en el mismo numero
        -En signos
            -> "23-*12"
            -> "3+/2"
            -> "3("
    Casos sin implementar:
        -(4)(2)
        -1+.2
        -raices
        -Flechas de direccion
    Cosas por optimizar:
        -La evaluacion de signos especiales ---(evaluate())
        -Es posible que no se necesite el regex

*/
