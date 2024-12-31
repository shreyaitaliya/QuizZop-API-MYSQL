const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the AdminInfo model
module.exports = (sequelize, DataTypes) => {
    const setting = sequelize.define('setting', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bgcolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#191a32',
        },        
        loginbuttoncolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#008000',
        },
        loginbuttonbordercolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#6063af',
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'quizZop',
        },
        cardcolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#26284c',
        },
        bordercolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#282a4f',
        },
        headingtextcolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#ffffff',
        },
        textcolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#8789c3',
        },
        titlebuttoncolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#FFD2A0',
        },
        correctanscolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#008000',
        },
        wronganscolor: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '#FF0000',
        },
    }, {
        tableName: 'setting',
        timestamps: false,
    });
    return setting;
};