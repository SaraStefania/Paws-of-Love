const User = require('../models/userModels')

const signUp = async (req, res) => {
    const { firstName, lastName, email, role, password } = req.body
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            role,
            password
        })
        res.status(201).json({ message: 'The user was created successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ message: 'error creating user', error: error });
    }

}

module.exports = {
    signUp
}