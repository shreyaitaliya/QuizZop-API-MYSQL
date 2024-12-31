const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the AdminInfo model
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(50),   
            allowNull: true,
        },
        endtime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        playcoin: {
            type: DataTypes.INTEGER(50),     
            allowNull: true,
        },
        wincoin: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
        },
        priority: {      
            type: DataTypes.INTEGER(50),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },     
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,   
        },
    }, {
        tableName: 'category',
        timestamps: false,
    });
    return category;
};
