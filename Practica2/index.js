import express from 'express';
import categoriaRutas from './rutas/categoriaRutas.js';
import productoRutas from './rutas/productoRutas.js';

const app = express();

app.use(express.json());

app.use('/api', categoriaRutas);
app.use('/api', productoRutas);

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


const puerto = 3021;
app.listen(puerto, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});