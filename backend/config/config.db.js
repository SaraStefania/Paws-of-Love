const dotenv = require('dotenv')

dotenv.config()

const mysql = require('mysql2')

let connection; 

try{
    connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    })

}catch(error){
console.log('Error connecting database')
}

module.exports = {connection}