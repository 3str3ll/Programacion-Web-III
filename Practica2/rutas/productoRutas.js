import express from 'express';
import {
    crearProducto,
    obtenerProductosConCategoria,
    obtenerProductoPorId,
    actualizarProducto,
    actualizarStock
} from '../controladores/productoControlador.js';

const router = express.Router();

// Ej6
router.post('/productos', crearProducto);

// Ej 7
router.get('/productos', obtenerProductosConCategoria);

// Ej8
router.get('/productos/:id', obtenerProductoPorId);

// Ej 9
router.put('/productos/:id', actualizarProducto);

// Ej10
router.patch('/productos/:id/stock', actualizarStock);

export default router;