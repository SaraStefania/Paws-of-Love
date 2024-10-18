const express = require('express')
const { sequelize } = require('./config/db.js')
const User = require('./models/userModels.js')
const usersRoute = require('./routes/users.js')
require('dotenv').config();

// Initialize the Express application
const app = express()
//Define the port for the server
const PORT = process.env.PORT;
//Parses incoming requests with a JSON payload
app.use(express.json());

//Main route
app.get('/', (req, res) => {
  res.send('Main page')
  next()
})

//Route
app.use('/users', usersRoute);

//Check if the connection works
sequelize.authenticate()
  .then(async () => {
    console.log('Connected to the database');
    // Create user table
    await User.sync({ force: true });
    console.log('The user table was created');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started and listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('The database did not connect:', err);
  });