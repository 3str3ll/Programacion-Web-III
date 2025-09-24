/*Almacenar el resto de los elementos de un arreglo sin tomar en cuenta los dos primeros
elementos de un arreglo, mediante desestructuración.*/

let numeros = [10, 20, 30, 40, 50, 60];

let [primero, segundo, ...resto] = numeros;

console.log(primero);  
console.log(segundo); 
console.log(resto);  