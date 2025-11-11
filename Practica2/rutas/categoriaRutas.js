import express from 'express';
import {
    crearCategoria,obtenerTodasCategorias,obtenerCategoriaConProductos,
    actualizarCategoria,
    eliminarCategoria
} from '../controladores/categoriaControlador.js';

const router = express.Router();

// Ej 1
router.post('/categories', crearCategoria);

// Ej 2
router.get('/categories', obtenerTodasCategorias);

// Ej 3
router.get('/categorias/:id', obtenerCategoriaConProductos);

// Ej4
router.put('/categorias/:id', actualizarCategoria);

// Ej5
router.delete('/categorias/:id', eliminarCategoria);

export default router;