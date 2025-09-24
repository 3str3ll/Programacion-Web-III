function miFuncion(frase) {
    let resultado = '';
    
    for (let letra of frase) {
        resultado = letra + resultado; 
    }
    
    return resultado;
}

console.log(miFuncion("abcd")); 