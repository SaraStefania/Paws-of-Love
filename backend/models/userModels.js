const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds)
            }
        }

    }
)


module.exports = User;


