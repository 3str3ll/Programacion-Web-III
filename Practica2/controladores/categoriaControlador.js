import * as categoriaModelo from '../modelos/categoriaModelo.js';

// Ej1
export const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const nuevaCategoria = await categoriaModelo.crearCategoria({ nombre, descripcion });
        res.status(201).json({
            ok: true,
            message: 'Categoría creada exitosamente',
            data: nuevaCategoria
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej2
export const obtenerTodasCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModelo.obtenerTodasCategorias();
        res.json({
            ok: true,
            data: categorias
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej3
export const obtenerCategoriaConProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await categoriaModelo.obtenerCategoriaConProductos(id);
        
        if (!resultado) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        
        res.json({
            ok: true,
            data: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej4
export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const affectedRows = await categoriaModelo.actualizarCategoria(id, { nombre, descripcion });
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        
        res.json({
            ok: true,
            message: 'Categoría actualizada exitosamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej5
export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await categoriaModelo.eliminarCategoria(id);
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        
        res.json({
            ok: true,
            message: 'Categoría y sus productos eliminados exitosamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};