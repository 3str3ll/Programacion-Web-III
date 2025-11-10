import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatosm'
});

// Verificar conexión
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// 1. Endpoint POST /categories - Registrar nueva categoría
app.post('/categories', (req, res) => {
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const q = "INSERT INTO categories (nombre, descripcion) VALUES (?, ?)";
    
    db.query(q, [nombre, descripcion], (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ 
            id: datos.insertId,
            nombre,
            descripcion,
            message: 'Categoría creada exitosamente' 
        });
    });
});

// 2. Endpoint GET /categories - Obtener todas las categorías
app.get('/categories', (req, res) => {
    const q = "SELECT * FROM categories ORDER BY fecha_alta DESC";
    
    db.query(q, (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(datos);
    });
});

// 3. Endpoint GET /categorias/:id - Obtener categoría con sus productos
app.get('/categorias/:id', (req, res) => {
    const id = req.params.id;
    
    const qCategoria = "SELECT * FROM categories WHERE id = ?";
    const qProductos = "SELECT * FROM productos WHERE categoria_id = ?";
    
    // Obtener categoría
    db.query(qCategoria, [id], (err, categoria) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (categoria.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        // Obtener productos de la categoría
        db.query(qProductos, [id], (err, productos) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            return res.json({
                categoria: categoria[0],
                productos: productos
            });
        });
    });
});

// 4. Endpoint PUT /categorias/:id - Actualizar categoría
app.put('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const q = "UPDATE categories SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?";
    
    db.query(q, [nombre, descripcion, id], (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (datos.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.json({ 
            message: 'Categoría actualizada exitosamente',
            affectedRows: datos.affectedRows 
        });
    });
});

// 5. Endpoint DELETE /categorias/:id - Eliminar categoría y sus productos
app.delete('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?";
    
    db.query(q, [id], (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (datos.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.json({ 
            message: 'Categoría y sus productos eliminados exitosamente',
            affectedRows: datos.affectedRows 
        });
    });
});

// 6. Endpoint POST /productos - Registrar nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;
    
    // Validaciones
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ 
            error: 'Nombre, precio, stock y categoria_id son requeridos' 
        });
    }

    // Verificar si la categoría existe
    const qVerificarCategoria = "SELECT id FROM categories WHERE id = ?";
    db.query(qVerificarCategoria, [categoria_id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (resultado.length === 0) {
            return res.status(400).json({ error: 'La categoría especificada no existe' });
        }

        // Insertar producto
        const qInsertar = "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)";
        
        db.query(qInsertar, [nombre, precio, stock, categoria_id], (err, datos) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ 
                id: datos.insertId,
                nombre,
                precio,
                stock,
                categoria_id,
                message: 'Producto creado exitosamente' 
            });
        });
    });
});

// 7. Endpoint GET /productos - Obtener todos los productos con nombre de categoría
app.get('/productos', (req, res) => {
    const q = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        ORDER BY p.fecha_alta DESC
    `;
    
    db.query(q, (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(datos);
    });
});

// 8. Endpoint GET /productos/:id - Obtener producto por ID con nombre de categoría
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    
    const q = `
        SELECT p.*, c.nombre as categoria_nombre 
        FROM productos p 
        INNER JOIN categories c ON p.categoria_id = c.id 
        WHERE p.id = ?
    `;
    
    db.query(q, [id], (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (datos.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.json(datos[0]);
    });
});

// 9. Endpoint PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio, stock, categoria_id } = req.body;
    
    // Validaciones
    if (!nombre || !precio || !stock || !categoria_id) {
        return res.status(400).json({ 
            error: 'Nombre, precio, stock y categoria_id son requeridos' 
        });
    }

    // Verificar si la categoría existe
    const qVerificarCategoria = "SELECT id FROM categories WHERE id = ?";
    db.query(qVerificarCategoria, [categoria_id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (resultado.length === 0) {
            return res.status(400).json({ error: 'La categoría especificada no existe' });
        }

        // Actualizar producto
        const qActualizar = "UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?";
        
        db.query(qActualizar, [nombre, precio, stock, categoria_id, id], (err, datos) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (datos.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            return res.json({ 
                message: 'Producto actualizado exitosamente',
                affectedRows: datos.affectedRows 
            });
        });
    });
});

// 10. Endpoint PATCH /productos/:id/stock - Actualizar stock
app.patch('/productos/:id/stock', (req, res) => {
    const id = req.params.id;
    const { cantidad } = req.body;
    
    if (cantidad === undefined || cantidad === null) {
        return res.status(400).json({ error: 'La cantidad es requerida' });
    }

    const q = "UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?";
    
    db.query(q, [cantidad, id], (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (datos.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        // Obtener el nuevo stock
        const qStock = "SELECT stock FROM productos WHERE id = ?";
        db.query(qStock, [id], (err, resultado) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            return res.json({ 
                message: `Stock ${cantidad >= 0 ? 'incrementado' : 'decrementado'} exitosamente`,
                cantidad_cambiada: cantidad,
                nuevo_stock: resultado[0].stock,
                affectedRows: datos.affectedRows 
            });
        });
    });
});
const puerto = 3011;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});