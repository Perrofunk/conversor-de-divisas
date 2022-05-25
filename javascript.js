var input = document.getElementById("conversor");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});
//Comienza la funcion convertirDivisas, la funcion a la cual llamamos en el documento HTML. En ella se establecen variables y constantes globales que luego se usan en otras funciones. Tambien es la que modifica el innerHTML de los elementos del body para mostrar los resultados. Obtiene y modifica elementos HTML haciendo uso del metodo document.getElementByID().innerHTML = "";
function convertirDivisas(){
  var content = '<p id="resultado"></p>';  
  var div1 = document.getElementById('divisa1').value.toLowerCase();
  var div2 = document.getElementById('divisa2').value.toLowerCase();
  var can = document.getElementById('cantidad').value;
//Se define un array, que contiene todas las divisas actualmente aceptadas. Por ahora solo hay Peso Argentino y Dolar Estadounidense.
  const divisasAceptadas = ["peso", "dolar"]

//Aca arranca la funcion resultadoFinal. Puede devolver a la funcion convertirDivisas, la conversion entre las dos divisas ingresadas por el usuario, o los errores encontrados durante el proceso, que luego ella se encarga de mostrar al usuario. Para aclarar, esta funcion NO muestra los resultados al usuario, de eso se encarga la funcion convertirDivisas, lo unico que hace es calcular la conversion y los errores, si es que ocurren, para luego pasarle la data a la funcion convertirDivisas.

  function resultadoFinal(div1, div2, can){
    var error = "";
    let errorDivisa1 = `La divisa "${div1}" no es un tipo de moneda aceptado. <br><br>`;
    let errorDivisa2 = `No se permite la conversion a "${div2}". No es una moneda valida o aún no se admite en este sistema. <br><br>`;
    let errorCantidad = `"${can}" no es un caracter válido. Asegurate de escribir un número<br><br>`
    let errorRedundancia = `Escribiste la misma moneda en ambos campos`
    let contadorDeErrores = 0;

/*Utilizando el metodo includes() se realiza una operacion logica que verifica si la divisa introducida por el usuario coincide con las que se encuentran en el array. Devuelve un valor booleano, verdadero, o falso, como argumento para el switch. En caso de que sea verdadero, se ejecuta el break, que aborta el switch actual y pasa al siguiente bloque de codigo. Si es falso, a la variable error se suma la variable errorDivisa1, y se suma 1 error al contador de errores, para que luego puedan ser brindadas a la funcion convertirDivisas, que las retorna al usuario. 

Funciona asi para los primeros 3 switches, pero el ultimo es a la inversa. 

Esto se debe a que se usa el metodo isNaN(), que chequea si el argumento brindado NO es un numero. Si el argumento NO es un numero, devuelve true (verdadero), pero si el argumento SI es un numero, devuelve false (falso). Se utilizan declaraciones switch porque quedan mas lindas que varias declaraciones if, son mas faciles de leer y comprender.*/

    switch (divisasAceptadas.includes(div1)) {
      case true:
        break;
      case false:
        error += errorDivisa1;
        contadorDeErrores += 1;
    }
    switch (divisasAceptadas.includes(div2)) {
      case true:
        break;
      case false:
        error += errorDivisa2;
        contadorDeErrores += 1;
      }
      switch (div1 === div2) {
        case true:
          error += errorRedundancia;
          contadorDeErrores +=1;
        case false:
          break;
      }
      switch (isNaN(can)) {
      case true:
        error += errorCantidad;
        contadorDeErrores += 1;
      case false:
        break;
      }
      
//El ultimo bloque de codigo de la funcion resultadoFinal. Aqui se analiza si hubo errores durante la conversion. Esto mediante una declaracion IF que evalua si la variable contadorDeErrores vale 0 o no. Si es cierto, ejecuta la operacion matematica para convertir las divisas, un calculo muy simple porque actualmente solo puede haber dos posibilidades. Pero si no, le devuelve la concatenacion de errores y el contador de errores a la funcion convertirDivisas, que luego se encargara de presentarlos al usuario. 

    if (contadorDeErrores == 0){
      let final = 0;
      if (div1 === "dolar"){
        final = can * 117.80;
      } else{
        final = can / 117.80;
      }
      return parseFloat(final);
    } else {
      return `Errores detectados : ${contadorDeErrores}<br> ${error}`;
    }

  }
//Aqui termina la funcion resultadoFinal

  function divisa(divisa, can){
    function plural(divisa, can){
      if (can>1 && divisa==="peso"){
        return "s";
      } else if(can>1 && divisa==="dolar"){
        return "es";
      } else if (can<=1){
        return "";
      }
    }
    return divisa + plural(divisa, can);
  }

  if (isNaN(resultadoFinal(div1, div2, can))){
    document.getElementById("resultado").innerHTML = resultadoFinal(div1, div2, can);
  } else {
    document.getElementById("resultado").innerHTML = `Convertir ${can} ${divisa(div1, can)} a ${divisa(div2, can)} da como resultado: ${resultadoFinal(div1, div2, can)} ${divisa(div2, resultadoFinal(div1, div2, can))}`;
    
        };
  }