const imagen = document.getElementById("imagen")

imagen.src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/02/elden-ring-ya-juego-mejor-puntuado-historia-superando-mario-zelda-2626797.jpg?tf=828x"

function cambiarImagen1 (){
    imagen.src="https://gmedia.playstation.com/is/image/SIEPDC/elden-ring-screenshot-10-en-15jun21?$1200px$"
}


function cambiarImagen2 (){
    imagen.src="https://gmedia.playstation.com/is/image/SIEPDC/elden-ring-pvp-screenshot-01-en12dec22?$1200px$"
}

function exampleWithLet() {
    let x = 10;
    if (true) {
      let x = 20; // Variable local dentro del bloque if
      console.log(x); // Salida: 20
    }
    console.log(x); // Salida: 10 (variable original no afectada por el bloque if)
  }
  
  // Ejemplo con var
  function exampleWithVar() {
    var y = 10;
    if (true) {
      var y = 20; // Variable reasignada dentro del bloque if
      console.log(y); // Salida: 20
    }
    console.log(y); // Salida: 20 (variable original modificada por el bloque if)
  }
  
  exampleWithLet();
  exampleWithVar();
  
  
  
  
  
  