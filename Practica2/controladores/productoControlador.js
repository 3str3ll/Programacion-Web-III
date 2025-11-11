import * as productoModelo from '../modelos/productoModelo.js';

// Ej6
export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria_id } = req.body;
        
        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ 
                error: 'Nombre, precio, stock y categoria_id son requeridos' 
            });
        }

        const nuevoProducto = await productoModelo.crearProducto({
            nombre, 
            precio: parseFloat(precio), 
            stock: parseInt(stock), 
            categoria_id: parseInt(categoria_id)
        });
        
        res.status(201).json({
            ok: true,
            message: 'Producto creado exitosamente',
            data: nuevoProducto
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej7
export const obtenerProductosConCategoria = async (req, res) => {
    try {
        const productos = await productoModelo.obtenerProductosConCategoria();
        res.json({
            ok: true,
            data: productos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej 8
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoModelo.obtenerProductoPorId(id);
        
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({
            ok: true,
            data: producto
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej 9
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria_id } = req.body;
        
        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ 
                error: 'Nombre, precio, stock y categoria_id son requeridos' 
            });
        }

        const affectedRows = await productoModelo.actualizarProducto(id, {
            nombre, 
            precio: parseFloat(precio), 
            stock: parseInt(stock), 
            categoria_id: parseInt(categoria_id)
        });
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({
            ok: true,
            message: 'Producto actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ej10
export const actualizarStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({ error: 'La cantidad es requerida' });
        }

        const nuevoStock = await productoModelo.actualizarStock(id, parseInt(cantidad));
        
        if (nuevoStock === null) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({
            ok: true,
            message: `Stock ${cantidad >= 0 ? 'incrementado' : 'decrementado'} exitosamente`,
            cantidad_cambiada: parseInt(cantidad),
            nuevo_stock: nuevoStock
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};