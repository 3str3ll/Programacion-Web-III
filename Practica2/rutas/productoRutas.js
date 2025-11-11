import express from 'express';
import {
    crearProducto,
    obtenerProductosConCategoria,
    obtenerProductoPorId,
    actualizarProducto,
    actualizarStock
} from '../controladores/productoControlador.js';

const router = express.Router();

// Ejercicio 6
router.post('/productos', crearProducto);

// Ejercicio 7
router.get('/productos', obtenerProductosConCategoria);

// Ejercicio 8
router.get('/productos/:id', obtenerProductoPorId);

// Ejercicio 9
router.put('/productos/:id', actualizarProducto);

// Ejercicio 10
router.patch('/productos/:id/stock', actualizarStock);

export default router;