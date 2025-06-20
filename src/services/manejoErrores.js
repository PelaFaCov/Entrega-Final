export const manejarError = (res, err, contexto = "Error del servidor") => {
    const mensajeOriginal = err?.message || String(err);
    const codigo = err?.code;

    console.error(`[${contexto}]`, mensajeOriginal); //traigo el error del codigo al que fue implementado   
    if (codigo === 16 || mensajeOriginal.includes("UNAUTHENTICATED")) {
        return res.status(401).json({ error: "No autenticado: revisá las credenciales o el token." }); //Autenticación fallida
    }
    if (mensajeOriginal.includes("Missing or insufficient permissions")) {
        return res.status(403).json({ error: "No tenés permisos suficientes para esta operación." }); //Permisos insuficientes
    }
    if (mensajeOriginal.includes("Network") || mensajeOriginal.includes("ENOTFOUND")) {
        return res.status(503).json({ error: "Firestore no disponible: problema de red o DNS." }); //Error de red o conexión
    }
    if (mensajeOriginal.includes("not found") || mensajeOriginal.includes("no se encuentra")) {
        return res.status(404).json({ error: "Recurso no encontrado." }); //Documento inexistente
    }
    return res.status(500).json({ error: `${contexto}` }); //error x
};

