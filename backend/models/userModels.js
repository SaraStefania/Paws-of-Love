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
            validate: {
               min: 1,
               max: 50,
               notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 50,
                notEmpty: true
                
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'the email is invalid'
                }
            }
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


