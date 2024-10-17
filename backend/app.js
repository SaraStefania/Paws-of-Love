const express = require('express')
const usersRoute = require('./routes/users.js')
require('dotenv').config();

// Inicializar la aplicación Express
const app = express()
// Definir el puerto para el servidor
const PORT = process.env.PORT;
//analiza las solicitudes entrantes con una carga útil JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello cambrio!')
  next()
})


app.use('/users', usersRoute);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
