//conexion a la base de datos
const { connection } = require('../config/db');

//Check if the user exists
const userExists = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [id], 
            (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.length > 0); 
        });
    });
};
//Extract keys and values ​​from an object
const keysAndValues = (body) => {
    let keys = [];
    let values = [];

    for (const [key, value] of Object.entries(body)) {
        keys.push(`${key} = ?`);
        values.push(value);
    }

    return { keys, values };
};

//Search all records
getUsers = (req, res) => {
    connection.query("SELECT * FROM users",
        (error, results) => {
            if (error) {
                console.error('Error while executing the query:', error);
                res.status(500).send('error');
            }
            res.json(results)
        });
};
//Search records by id
getUsersId = async(req, res) => {
     const id = req.params.id;
    const exists = await userExists(id);
    if (!exists) {
        return res.status(404).json({ message: 'User not found' });
    }
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
};
//Create record
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

//Edit some records
patchUsers = async (req, res) => {
    const id = req.params.id
    const body = req.body
    let query = ""

    const exists = await userExists(id);
    if (!exists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { keys, values } = keysAndValues(body);
    if (keys.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    query = `UPDATE users SET ${keys.join(',')} WHERE id = ?`
    values.push(id)

    connection.query(query, values,
        (error, results) => {
            if (error) {
                console.error('Error updating:', error);
                res.status(500).send('error');
            }
            res.status(201).json({ "The data was updated successfully": results.affectedRows })
        })
}
//Edit all records
putUsers = async(req, res) => {
    const id = req.params.id
    const body = req.body
    let query = ''
    const requiredField = ['nombre', 'edad']

    const exists = await userExists(id);
    if (!exists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const missingFields = requiredField.filter(field => !(field in body));
    if(missingFields.length > 0){
        return res.status(400).json({ message: "Missing field: " + missingFields});
    }
   
    const { keys, values } = keysAndValues(body);
    query = `UPDATE users SET ${keys.join(',')} WHERE id = ?`
    values.push(id)

    connection.query(query, values,
        (error, results) => {
            if (error) {
                res.status(500).send('error');
            }
            res.status(201).json({ "All the data was updated successfully": results.affectedRows })
        })
}
//Delete records
deleteUsers = async(req, res) => {
    const id = req.params.id
    const exists = await userExists(id);
    if (!exists) {
        return res.status(404).json({ message: 'User not found' });
    }

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
    patchUsers,
    putUsers
}
