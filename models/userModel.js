const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the AdminInfo model
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        coin: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'user',
        timestamps: false,
    });
    return user;
};
