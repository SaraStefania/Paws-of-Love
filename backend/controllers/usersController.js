//conexion a la base de datos
const { connection } = require('../config/config.db')

getUsers = (req, rest) => {
    connection.query("SELECT * FROM users",
        (error, results) => {
            if (error) {
                console.error('Error while executing the query:', error);
                rest.status(500).send('error');
            }
            rest.json(results)
        });
};
getUsersId = (req, res) => {
    const id = req.params.id
    connection.query("SELECT * FROM users WHERE id = ?", [id],
        (error, results) => {
            if (error) {
                console.error('Error while executing the query by id: ', error);
                res.status(500).send('error');
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(results)
        })
}
postUsers = (req, res) => {
    const { nombre, edad } = req.body
    connection.query("INSERT INTO users(nombre, edad) VALUES (?,?)", [nombre, edad],
        (error, results) => {
            if (error) {
                console.error('Error adding:', error);
                res.status(500).send('error');
            }
            res.status(201).json({ "Was added correctly": results.affectedRows });
        })
}
patchUsers = (req, res) => {
    const id = req.params.id
    const { nombre, edad } = req.body
    let query = ""
    let values = []
    if (nombre !== undefined) {
        query = "UPDATE users SET nombre = ? WHERE id = ?"
        values = [nombre, id]
    } else if (edad !== undefined) {
        query = "UPDATE users SET edad = ? WHERE id = ?"
        values = [edad, id]
    } else {
        console.error("No information provide")
        return
    }
    connection.query(query, values,
        (error, results) => {
            if (error) {
                console.error('Error updating:', error);
                res.status(500).send('error');
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(201).json({ "It was updated correctly": results.affectedRows })
        })
}
deleteUsers = (req, res) => {
    const id = req.params.id
    connection.query("DELETE FROM users WHERE id = ?", [id],
        (error, results) => {
            if (error) {
                res.status(500).send('error');
            }
            res.status(201).json({ "The user was delete": results.affectedRows })

        })

}
module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    getUsersId,
    patchUsers
}
