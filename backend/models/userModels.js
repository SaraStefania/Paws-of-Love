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
                len: {
                    args: [2, 40],  
                    msg: 'The name must be between 2 and 40 characters'
                },
                notEmpty: {
                    msg: 'The name cannot be empty.'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 40],  
                    msg: 'The last name must be between 2 and 40 characters'
                },
                notEmpty: {
                    msg: 'The last name cannot be empty.'
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'the email is invalid'
                }
            },
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user',
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: {
                    args: [8, 20],  
                    msg: 'The password must be between 8 and 20 characters'
                },
                is: {
                    args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    msg: 'The password must contain at least one uppercase letter, one lowercase letter, and one number'
                }
            }
           
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


