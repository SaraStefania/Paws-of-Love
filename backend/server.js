const {sequelize} = require('./config/db')

sequelize.authenticate()
  .then(() => {
    console.log('Connected database')
  })
  .catch(err => {
    console.log('The database did not connect')
  })

