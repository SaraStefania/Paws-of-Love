//conexion a la base de datos
const { connection } = require('../config/config.db')

getUsers = (req, rest) => {
    connection.query("SELECT * FROM users",
        (error, results) => {
            if (error) {
                console.error('Error ejecutando la consulta:', error);
                rest.status(500).send('error');
            }
            rest.json(results)
        });
};

postUsers = (req, res) => {
    const { nombre, edad } = req.body
    connection.query("INSERT INTO users(nombre, edad) VALUES (?,?)",
        [nombre, edad],
        (error, results) => {
            if (error) {
                console.error('Error adding:', error);
                res.status(500).send('error');
            }
            res.status(201).json({ message: "Was added correctly", affectedRows: results.affectedRows });
        })

}
module.exports = {
    getUsers,
    postUsers
}
