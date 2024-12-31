const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the AdminInfo model
module.exports = (sequelize, DataTypes) => {
    const quizequestion = sequelize.define('quizequestion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        A: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        B: {    
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        C: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        D: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        answer: {
            type: DataTypes.ENUM('A', 'B', 'C', 'D'),
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
        }
    }, {
        tableName: 'quizequestion',
        timestamps: false,
    });
    return quizequestion;
};
