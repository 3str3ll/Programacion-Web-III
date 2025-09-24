function miFuncion(numeros) {
    let resultado = {
        pares: [],
        impares: []
    };
    
    for (let numero of numeros) {
        if (numero % 2 === 0) {
            resultado.pares.push(numero);
        } else {
            resultado.impares.push(numero);
        }
    }
    
    return resultado;
}
let obj = miFuncion([9, 2, 3, 4, 5]);
console.log(obj); 

