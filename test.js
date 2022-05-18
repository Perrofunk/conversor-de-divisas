const form = document.getElementById('conversor');
const divisaConvertir = form.elements['divisaconvertir']
const divisaDeseada = form.elements['divisafinal']
const cantidad = form.elements['cantidad']

let div1 = divisaConvertir.value;
let div2 = divisaDeseada.value;
let can = cantidad.value;

function funcion(div1, div2, can){
    let value = 0
    if (div1.toLowerCase() != "peso"){
        value += 1
    }
    if(div2.toLowerCase() != "dolar"){
        value += 2
    }
    switch (value){
    case 0:
        break;
    case 1:
        return "Hubo un error, escribe tu divisa a convertir nuevamente";
    case 2:
        return "Hubo un error, escribe la divisa a la que queres convertir nuevamente";
    case 3:
        return "Hubo multiples errores, debes escribir ambas divisas nuevamente, asegurate que estan bien escritas";
    
    }
    let final = can * 200;
    return final;
};
if (!Number.isInteger(funcion(div1, div2, can))){
    document.getElementById("placeholder").innerHTML = funcion(div1, div2, can);
} else {
    document.getElementById("cantidad").innerHTML = can;
    document.getElementById("divisa").innerHTML = div1;
    document.getElementById("divisa2").innerHTML = div2;
    document.getElementById("divisa3").innerHTML = div2;
    document.getElementById("resultado").innerHTML = funcion(div1, div2, can);
}

// let fin = funcion("Dolar", "Peso", 10);
// console.log(fin);