function Promesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.3;
            if (exito) {
                resolve({ data: "Datos obtenidos exitosamente" });
            } else {
                reject("Error al obtener datos");
            }
        }, 1000);
    });
}
Promesa()
    .then(resultado => {
        console.log("Éxito:", resultado);
    })
    .catch(error => {
        console.error("Error:", error);
    });
async function obtenerDatosAsync() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exito = Math.random() > 0.3;
    if (exito) {
        return { data: "Datos obtenidos exitosamente" };
    } else {
        throw new Error("Error al obtener datos");
    }
}
async function ejecutarAsync() {
    try {
        const resultado = await obtenerDatosAsync();
        console.log("Éxito:", resultado);
    } catch (error) {
        console.error("Error:", error);
    }
}

ejecutarAsync();