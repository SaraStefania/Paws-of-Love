const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        })
        res.status(201).json({ message: 'The user was created successfully', user: newUser });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'The email must be unique.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(err => err.message) });
        }
        res.status(500).json({ message: 'error creating user', error: error });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        //Searches the user's database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'The user was not found' });
        }

        //Password is validated
        const validatePassword = await bcrypt.compare(password, user.password);
        if (validatePassword) {
            return res.status(200).json({ message: 'successful login', user })
        } else {
            return res.status(401).json({ message: 'incorrect password' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Login error', error: error });
    }

}

module.exports = {
    signUp,
    signIn
}