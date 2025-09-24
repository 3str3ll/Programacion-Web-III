function Archivo(ruta, encoding, callback) {
    setTimeout(() => {
        if (ruta.includes("error")) {
            callback(new Error("Archivo no encontrado"));
        } else {
            callback(null, `Contenido de ${ruta}`, "utf8");
        }
    }, 800);
}

function Promesa(ruta, encoding = "utf8") {
    return new Promise((resolve, reject) => {
        Archivo(ruta, encoding, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
Promesa("documento")
    .then(data => {
        console.log("Archivo leído:", data);
    })
    .catch(error => {
        console.error("Error leyendo archivo:", error.message);
    });

