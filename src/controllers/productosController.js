import { db } from '../config/firebase-backend.js';
import { manejarError } from '../services/manejoErrores.js';
import {
    obtenerTodosLosProductos,
    obtenerProductoPorIdDesdeDB,
    crearProductoConID,
    eliminarProductoPorId
} from '../services/modularizaciones.js';


export const obtenerProductos = async (req, res) => {
    try {
        const buscarEn = await obtenerTodosLosProductos();
        
        if (buscarEn.empty) {
            return res.status(404).json({ mensaje: "No hay productos disponibles en la base de datos" });
        }
        
        const productos = buscarEn.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(productos);
    } catch (err) {
        manejarError(res, err, "Error al obtener productos");
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const docSnap = await obtenerProductoPorIdDesdeDB(req.params.id);
        if (!docSnap.exists) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ id: docSnap.id, ...docSnap.data() });
    } catch (err) {
        manejarError(res, err, "Error al obtener producto por ID");
    }
};

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        if (!nombre || isNaN(precio) || precio <= 0) {
            return res.status(400).json({ error: "Datos inválidos para el producto" });
        }
        const nuevo = await crearProductoConID({ nombre, precio });
        res.status(201).json(nuevo);
    } catch (err) {
        manejarError(res, err, "Error al crear producto");
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const resultado = await eliminarProductoPorId(req.params.id);

        if (!resultado) {
            return res.status(404).json({ error: "Producto no encontrado, no se puede eliminar" });
        }
            res.json({ mensaje: "✅ Producto eliminado correctamente" });
    } catch (err) {
        manejarError(res, err, "Error al eliminar producto");
    }
};
