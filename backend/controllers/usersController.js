//conexion a la base de datos
const {connection} = require('../config/config.db')

exports.getUsers = (req, rest) => {
    connection.query("SELECT * FROM users", 
        
    (error, results) => {
        if(error){
            console.error('Error ejecutando la consulta:', error);
            rest.status(500).send('error');
        }
        rest.json(results)   
    });
  };
  
  
