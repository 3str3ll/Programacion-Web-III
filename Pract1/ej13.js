function verificarInventario(productoId, cantidad) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cantidad <= 100) {
                resolve({ productoId, cantidad, disponible: true, mensaje: "Producto disponible" });
            } else {
                reject(new Error("Stock insuficiente"));
            }
        }, 500);
    });
}
function calcularEnvio(direccion, peso) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const costo = peso * 5 + 10;
            resolve({ direccion, peso, costo, mensaje: "Envío calculado" });
        }, 300);
    });
}
function procesarPago(usuarioId, total) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (total > 0 && total < 1000) {
                resolve({ usuarioId, total, estado: "aprobado", transaccionId: "tx_" + Date.now() });
            } else {
                reject(new Error("Error en el pago"));
            }
        }, 400);
    });
}

function enviarConfirmacion(usuarioId, pedidoId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ usuarioId, pedidoId, enviado: true, mensaje: "Confirmación enviada por email" });
        }, 200);
    });
}
async function procesarPedidoConAsyncAwait(usuarioId, productoId, cantidad, direccion, peso) {
    console.log(" PROCESANDO CON ASYNC/AWAIT...");
    
    try {
        const inventario = await verificarInventario(productoId, cantidad);
        console.log(" Inventario verificado:", inventario);
        const envio = await calcularEnvio(direccion, peso);
        console.log(" Envío calculado:", envio);
        const total = (cantidad * 10) + envio.costo;
        const pago = await procesarPago(usuarioId, total);
        console.log(" Pago procesado:", pago);
        const pedidoId = 'ped_' + Date.now();
        const confirmacion = await enviarConfirmacion(usuarioId, pedidoId);
        console.log(" Confirmación:", confirmacion);
        return {
            inventario,
            envio,
            pago,
            pedidoId,
            confirmacion,
            total
        };
     } catch (error) {
        console.error(" Error en el proceso:", error.message);
        throw new Error(`Proceso fallido: ${error.message}`);
    }
}
async function ejecutarEjemplo() {
    try {
        const resultado = await procesarPedidoConAsyncAwait("user_123", "prod_456", 2, "Calle Principal 123", 1.5);
        console.log("PEDIDO COMPLETADO EXITOSAMENTE:");
        console.log(resultado);
    } catch (error) {
        console.error(" Error al ejecutar el ejemplo:", error.message);
    }
}
ejecutarEjemplo();