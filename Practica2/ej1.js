import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practica2'
});

// Verificar conexión
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/categorias', (req, res) => {
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const q = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
    
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

// Inicializar servidor
const puerto = 3011;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});