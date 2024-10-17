// Importar Express
const express = require('express')
const usersRoute = require('./routes/users.js')

require('dotenv').config();

//conexion a la base de datos

// Inicializar la aplicación Express
const app = express()
// Definir el puerto para el servidor
const PORT = process.env.PORT;

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello cambrio!')
  next()
})


app.use('/api', usersRoute );

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
