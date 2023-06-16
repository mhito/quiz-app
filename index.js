const express = require('express');
const app = express();
const corridaRoutes = require('./src/routes/corridaRoutes');
const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST || 'mongodb+srv://XsC21U52eGaEYV7x:XsC21U52eGaEYV7x@cluster0.2ymmz.mongodb.net/?retryWrites=true&w=majority';

// console.log('mongoHost', mongoHost);

// Conexión a la base de datos
mongoose.connect(`${mongoHost}/ado`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

app.use(express.json());

// Rutas
app.use('/corridas', corridaRoutes);

// Puerto de escucha
const port = 3000;
module.exports = app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});

