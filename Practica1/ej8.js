/*Realizar un código para ejecutar una función callback después 2 segundos*/
function miCallback(){
    console.log("este mensake aparece 2 segundos");
}
console.log("iniciando el temporizador...");
setTimeout(miCallback,2000);
console.log("el temporizador fue iniciado el mensaje se muestra de inmediato");
