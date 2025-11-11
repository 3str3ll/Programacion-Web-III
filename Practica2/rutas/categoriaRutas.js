import express from 'express';
import {
    crearCategoria,
    obtenerTodasCategorias,
    obtenerCategoriaConProductos,
    actualizarCategoria,
    eliminarCategoria
} from '../controladores/categoriaControlador.js';

const router = express.Router();

// Ejercicio 1
router.post('/categories', crearCategoria);

// Ejercicio 2
router.get('/categories', obtenerTodasCategorias);

// Ejercicio 3
router.get('/categorias/:id', obtenerCategoriaConProductos);

// Ejercicio 4
router.put('/categorias/:id', actualizarCategoria);

// Ejercicio 5
router.delete('/categorias/:id', eliminarCategoria);

export default router;