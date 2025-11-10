import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

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
// 2. Endpoint GET /categories - Obtener todas las categorías
app.get('/categorias', (req, res) => {
    const q = "SELECT * FROM categories ORDER BY fecha_alta DESC";
    
    db.query(q, (err, datos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(datos);
    });
});

const puerto = 3012;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});