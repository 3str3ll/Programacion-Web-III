import { db } from '../config/db.js';

// Ejercicio 1: Crear nueva categoría
export const crearCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query(
        'INSERT INTO categories (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return { id: resultado.insertId, ...categoria };
};

// Ejercicio 2: Obtener todas las categorías
export const obtenerTodasCategorias = async () => {
    const [resultado] = await db.query('SELECT * FROM categories ORDER BY fecha_alta DESC');
    return resultado;
};

// Ejercicio 3: Obtener categoría por ID con productos
export const obtenerCategoriaConProductos = async (id) => {
    const [categorias] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    
    if (categorias.length === 0) {
        return null;
    }
    
    const [productos] = await db.query(
        'SELECT * FROM productos WHERE categoria_id = ?',
        [id]
    );
    
    return {
        categoria: categorias[0],
        productos: productos
    };
};

// Ejercicio 4: Actualizar categoría
export const actualizarCategoria = async (id, categoria) => {
    const { nombre, descripcion } = categoria;
    const [resultado] = await db.query(
        'UPDATE categories SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [nombre, descripcion, id]
    );
    return resultado.affectedRows;
};

// Ejercicio 5: Eliminar categoría
export const eliminarCategoria = async (id) => {
    const [resultado] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return resultado.affectedRows;
};