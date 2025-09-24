async function miFuncion(userId) {
    try {
        const usuario = await obtenerUsuarioAsync(userId);
        const usuarioValido = await validarUsuarioAsync(usuario);
        const idGuardado = await guardarEnBDAsync(usuarioValido);
        const resultadoEmail = await enviarEmailConfirmacionAsync(usuarioValido.email);
        const analytics = await registrarAnalyticsAsync(usuarioValido);
        
        return {
            usuario: usuarioValido,
            id: idGuardado,
            emailEnviado: resultadoEmail,
            analytics: analytics
        };
    } catch (error) {
        throw new Error(`Error en procesamiento: ${error.message}`);
    }
}
async function obtenerUsuarioAsync(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, nombre: 'Juan', email: 'juan@email.com', activo: true });
        }, 100);
    });
}
async function validarUsuarioAsync(usuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (usuario.activo) {
                resolve({ ...usuario, validado: true });
            } else {
                reject(new Error('Usuario inactivo'));
            }
        }, 100);
    });
}
async function guardarEnBDAsync(usuario) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`user_${Date.now()}`);
        }, 150);
    });
}
async function enviarEmailConfirmacionAsync(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ enviado: true, email });
        }, 200);
    });
}
async function registrarAnalyticsAsync(usuario) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ evento: 'registro', timestamp: new Date() });
        }, 100);
    });
}
async function main() {
    try {
        const resultado = await miFuncion(123);
        console.log('Resultado:', resultado);
        console.log('Proceso exitoso');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}
main();