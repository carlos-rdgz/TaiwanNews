// Importar Express y otras dependencias necesarias
const express = require('express');
const app = express();
const fetch = require('node-fetch');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// API Key de Currents API
const apiKey = 'V0sKvIkV-EZy7BuaY-bd38URbq9O3ldHOLgyhk4ISfGcR-gR';

// Función para obtener noticias por categoría
async function getNewsByCategory(category) {
    const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.news;
}

// Ruta para la página principal
app.get('/', async (req, res) => {
    const news = await getNewsByCategory('general');
    res.render('index', { news });
});

// Ruta para la página de deportes
app.get('/sports', async (req, res) => {
    const news = await getNewsByCategory('sports');
    res.render('sports', { news });
});

// Ruta para la página de tecnología
app.get('/technology', async (req, res) => {
    const news = await getNewsByCategory('technology');
    res.render('technology', { news });
});

// Ruta para la página de comida
app.get('/food', async (req, res) => {
    const news = await getNewsByCategory('food');
    res.render('food', { news });
});

// Configurar el motor de plantillas (EJS)
app.set('view engine', 'ejs');

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

