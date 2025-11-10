
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

const puerto = 3013;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});