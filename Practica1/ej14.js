function obtenerDatosPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.3;
            if (exito) {
                resolve({ datos: "Información importante" });
            } else {
                reject("Error al obtener datos");
            }
        }, 1000);
    });
}
obtenerDatosPromesa()
    .then(datos => console.log("Éxito:", datos))
    .catch(error => console.error("Error:", error));
function obtenerDatosCallback(callback) {
    obtenerDatosPromesa()
        .then(resultado => {
            callback(null, resultado);  
        })
        .catch(error => {
            callback(error, null);     
        });
}
obtenerDatosCallback((error, datos) => {
    if (error) {
        console.error("Error", error);
    } else {
        console.log("Éxito", datos);
    }
});