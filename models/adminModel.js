const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the AdminInfo model
module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'admin',
        timestamps: false,
    });

    admin.afterSync(async () => {
        const staticData = [
            { email: "admin", password: "admin123" },
        ];

        for (const data of staticData) {
            const [record, created] = await admin.findOrCreate({
                where: { email: data.email },
                defaults: data,
            });
            if (created) {
                console.log(`Added static admin: ${record.email}`);
            }
        }
    });

    return admin;   
};
