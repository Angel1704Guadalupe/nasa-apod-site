const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar las solicitudes a la API de la NASA
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: 'x0AeFumHGBfL65BrsWkToAWpqTpeuLGfnsTGIspv'  // Reemplaza con tu API key de la NASA
            }
        });
        res.json(response.data);  // Enviar datos como JSON
    } catch (error) {
        console.error('Error al obtener la foto del día:', error);
        res.status(500).json({ error: 'Error al obtener la foto del día' });  // Enviar error como JSON
    }
});

// Ruta para manejar todas las otras solicitudes y servir 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
