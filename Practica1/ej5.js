function miFuncion(cadena) {
    let textoLimpio = cadena.toLowerCase().replace(/[^a-z0-9]/g, '');
    
   
    return textoLimpio === textoLimpio.split('').reverse().join('');
}

let band1 = miFuncion("oruro");
console.log(band1);

let band2 = miFuncion("hola");
console.log(band2); 