import express from 'express';
import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    eliminarProducto
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.delete('/:id', eliminarProducto);

export default router;


