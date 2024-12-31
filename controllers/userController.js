const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const UserModel = require("../models/userModel")(sequelize, DataTypes);

// AddUser
const AddUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await UserModel.create({ name, email, password, image: req.file?.path || '' })

        return res.status(200).send({
            success: true,
            message: 'User Added Successfully..',
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// View Data
const ViewData = async (req, res) => {
    try {
        const data = await UserModel.findAll({});
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'User Data Can Not Find..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'User Data Find Successfully..',
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// GetByID
const GetByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await UserModel.findOne({ where: { id: id } });
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'User Can Not Find...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'User Data Find Successfully..',
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;

        const existingcategory = await UserModel.findByPk(id);

        if (!existingcategory) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            });
        }

        let imagePath = existingcategory.image;
        if (req.file) {
            const newImagePath = req.file.path;

            if (existingcategory.image && fs.existsSync(path.resolve(existingcategory.image))) {
                fs.unlinkSync(path.resolve(existingcategory.image));
            }
            imagePath = newImagePath;
        }

        const updatedData = await UserModel.update({
            image: imagePath, name, email, password
        }, {
            where: { id }
        });

        return res.status(200).send({
            message: 'User Updated successfully.',
            success: true,
            updatedData
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.',
            });
        }

        await UserModel.destroy({
            where: { id: id },
        });

        return res.status(200).json({
            success: true,
            message: 'user deleted successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the category.',
            error: error.message,
        });
    }
};

module.exports = ({
    AddUser, ViewData, GetByID, Update, Delete
})      