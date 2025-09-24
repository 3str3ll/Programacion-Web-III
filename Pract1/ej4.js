function miFuncion(numeros) {
    if (numeros.length === 0) {
        return { mayor: undefined, menor: undefined };
    }
    
    let mayor = numeros[0];
    let menor = numeros[0];
    for (let numero of numeros) {
        if (numero > mayor) {
            mayor = numero;
        }
        if (numero < menor) {
            menor = numero;
        }
    }
        return { mayor: mayor, menor: menor };
}
let obj = miFuncion([3, 1, 5, 4, 2]);
console.log(obj); 