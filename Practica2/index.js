import express from 'express';
import cors from 'cors';
import categoriaRutas from './rutas/categoriaRutas.js';
import productoRutas from './rutas/productoRutas.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', categoriaRutas);
app.use('/api', productoRutas);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Práctica 2 funcionando',
        endpoints: {
            categorias: {
                'POST /api/categories': 'Crear categoría',
                'GET /api/categories': 'Obtener todas las categorías',
                'GET /api/categorias/:id': 'Obtener categoría con productos',
                'PUT /api/categorias/:id': 'Actualizar categoría',
                'DELETE /api/categorias/:id': 'Eliminar categoría'
            },
            productos: {
                'POST /api/productos': 'Crear producto',
                'GET /api/productos': 'Obtener todos los productos',
                'GET /api/productos/:id': 'Obtener producto por ID',
                'PUT /api/productos/:id': 'Actualizar producto',
                'PATCH /api/productos/:id/stock': 'Actualizar stock'
            }
        }
    });
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

const puerto = 3000;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});