import { db } from '../config/db.js';

// Ejercicio 6: Crear nuevo producto
export const crearProducto = async (producto) => {
    const { nombre, precio, stock, categoria_id } = producto;
    const [resultado] = await db.query(
        'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, precio, stock, categoria_id]
    );
    return { id: resultado.insertId, ...producto };
};

// Ejercicio 7: Obtener todos los productos con nombre de categoría
export const obtenerProductosConCategoria = async () => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        ORDER BY p.fecha_alta DESC
    `);
    return resultado;
};

// Ejercicio 8: Obtener producto por ID con categoría
export const obtenerProductoPorId = async (id) => {
    const [resultado] = await db.query(`
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        WHERE p.id = ?
    `, [id]);
    return resultado[0] || null;
};

// Ejercicio 9: Actualizar producto
export const actualizarProducto = async (id, producto) => {
    const { nombre, precio, stock, categoria_id } = producto;
    const [resultado] = await db.query(
        'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [nombre, precio, stock, categoria_id, id]
    );
    return resultado.affectedRows;
};

// Ejercicio 10: Actualizar stock
export const actualizarStock = async (id, cantidad) => {
    const [resultado] = await db.query(
        'UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [cantidad, id]
    );
    
    if (resultado.affectedRows > 0) {
        const [producto] = await db.query('SELECT stock FROM productos WHERE id = ?', [id]);
        return producto[0].stock;
    }
    return null;
};