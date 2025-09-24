function verificarStock(productoId) {
    return new Promise((resolve, reject) => {
        console.log(`🔍 Verificando stock del producto ${productoId}...`);
        
        setTimeout(() => {
            const stockDisponible = Math.random() > 0.2; 
            
            if (stockDisponible) {
                resolve({ 
                    productoId, 
                    stock: true, 
                    cantidad: Math.floor(Math.random() * 10) + 1 
                });
            } else {
                reject(` Producto ${productoId} sin stock disponible`);
            }
        }, 1000);
    });
}
function calcularCosto(datosStock, cantidad) {
    return new Promise((resolve) => {
        console.log(`💰 Calculando costo para ${cantidad} unidades...`);
        
        setTimeout(() => {
            const precioUnitario = 25; 
            const total = precioUnitario * cantidad;
            const iva = total * 0.16;
            const totalConIva = total + iva;
            
            resolve({
                ...datosStock,
                cantidad,
                precioUnitario,
                subtotal: total,
                iva: iva,
                total: totalConIva
            });
        }, 800);
    });
}
function procesarPago(datosCompra) {
    return new Promise((resolve, reject) => {
        console.log(`💳 Procesando pago de $${datosCompra.total}...`);
        
        setTimeout(() => {
            const pagoExitoso = Math.random() > 0.3; 
            
            if (pagoExitoso) {
                const numeroTransaccion = 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                resolve({
                    ...datosCompra,
                    pagoExitoso: true,
                    numeroTransaccion,
                    fecha: new Date().toISOString()
                });
            } else {
                reject(" Pago rechazado por el banco");
            }
        }, 1500);
    });
}
function generarFactura(datosPago) {
    return new Promise((resolve) => {
        console.log(`🧾 Generando factura...`);
        
        setTimeout(() => {
            const factura = {
                numeroFactura: 'FAC-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                ...datosPago,
                estado: 'COMPLETADA'
            };
            
            resolve(factura);
        }, 600);
    });
}
function enviarConfirmacion(factura) {
    return new Promise((resolve) => {
        console.log(`Enviando confirmación al cliente...`);
        
        setTimeout(() => {
            resolve({
                ...factura,
                emailEnviado: true,
                mensaje: ` Compra exitosa! Factura ${factura.numeroFactura} enviada por email`
            });
        }, 500);
    });
}
console.log(" INICIANDO PROCESO DE COMPRA...\n");

verificarStock("PROD-123")
    .then(stockData => {
        console.log(" Stock disponible:", stockData.cantidad, "unidades");
        return calcularCosto(stockData, 2);
    })
    .then(compraData => {
        console.log(" Costo calculado: $", compraData.total);
        return procesarPago(compraData);
    })
    .then(pagoData => {
        console.log("Pago exitoso. Transacción:", pagoData.numeroTransaccion);
        return generarFactura(pagoData);
    })
    .then(factura => {
        console.log(" Factura generada:", factura.numeroFactura);
        return enviarConfirmacion(factura);
    })
    .then(resultadoFinal => {
        console.log("\n PROCESO COMPLETADO EXITOSAMENTE!");
        console.log("Resumen final:", resultadoFinal);
    })
    .catch(error => {
        console.log("\n ERROR EN EL PROCESO:");
        console.log(error);
    })
    .finally(() => {
        console.log("\n Proceso de compra finalizado ");
    });