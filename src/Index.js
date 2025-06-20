import express from 'express';
import path from 'path';
import productosRouter from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//Importar las rutas correctamente después de definir app
app.use('/auth', authRoutes);
app.use('/productos', productosRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


