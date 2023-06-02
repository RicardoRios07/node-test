const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// Rutas estáticas para los archivos generados por React
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});