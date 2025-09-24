/*Crear una promesa que devuelva un mensaje de éxito después de 3 segundos.*/
const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Éxito");
    }, 3000);
});

miPromesa
    .then(mensaje => {
        console.log(mensaje);
    })
    .catch(error => {
        console.error("Error:", error);
    });

console.log("Promesa iniciada, esperando 3 segundos");