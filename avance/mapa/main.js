const field = document.querySelector('.field')
console.log(field.getBoundingClientRect())

console.log(field)

if (field){
    field.addEventListener('click', ( event )=>{
        let x = event.clientX
        let y = event.clientY
    
        console.log(x,y);
    })
}
