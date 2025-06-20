import { db } from '../config/firebase-backend.js';

export const obtenerTodosLosProductos = async () => {
    return await db.collection('productos').get();
};

export const obtenerProductoPorIdDesdeDB = async (id) => {
    const docRef = db.collection('productos').doc(String(id));
    return docSnap = await docRef.get();
};

export const crearProductoConID = async ({ nombre, precio }) => {
    const snapshot = await db.collection('productos').get();
    let maxId = 0;
    snapshot.forEach(doc => {
        const idNumerico = parseInt(doc.id);
        if (!isNaN(idNumerico) && idNumerico > maxId) {
            maxId = idNumerico;
        }
    });
    const nuevoId = maxId + 1;
    const nuevoProducto = {
        nombre,
        precio: parseFloat(precio)
    };
    await db.collection('productos').doc(String(nuevoId)).set(nuevoProducto);
    return { id: nuevoId, ...nuevoProducto };
};


export const eliminarProductoPorId = async (id) => {
    const productoRef = db.collection('productos').doc(String(id));
    const docSnap = await productoRef.get();

    if (!docSnap.exists) {
        return null;
    }

    await productoRef.delete();
    return true;
};