function verificarNumero(numero) {
    let resultado = "";
    
    if (numero > 0) {
        resultado = "POSITIVO";
    } else if (numero < 0) {
        resultado = "NEGATIVO";
    } else {
        resultado = "CERO";
    }
    
    return resultado;
}
let test1 = verificarNumero(5);
console.log("Número 5 es:", test1);