const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const rules = sequelize.define('rules', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rules: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'rules',      
        timestamps: false,
    });
    return rules;
};