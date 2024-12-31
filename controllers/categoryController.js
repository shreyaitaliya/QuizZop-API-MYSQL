const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const category = require('../migrations/20241206063221-add-description-to-category')
const categoryModel = require("../models/categoryModel")(sequelize, DataTypes);
require('dotenv').config();

// Add category
const AddCategory = async (req, res) => {
    try {
        const { title, endtime, playcoin, wincoin, priority, description } = req.body

        let formattedEndtime;
        if (endtime) {
            formattedEndtime = moment(endtime, "HH:mm:ss").format("HH:mm:ss");

            if (!moment(formattedEndtime, "HH:mm:ss", true).isValid()) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid time format for endtime. Please provide a valid time in HH:mm:ss format.'
                });
            }
        }

        let imagePath = "";
        if (req.file) {
            const baseUrl = process.env.IMAGE_URL;
            imagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;
        }

        const data = await categoryModel.create({ title, endtime: formattedEndtime, playcoin, wincoin, priority, image: imagePath, description });

        return res.status(200).send({
            success: true,
            message: 'Category Added Successfully..',
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

// View Catgeory 
const ViewCategory = async (req, res) => {
    try {
        const data = await categoryModel.findAll({})
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Category Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Category Data Found Successfully..',
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

// GetById
const GetByID = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await categoryModel.findOne({ where: { id: id } });
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Category Data Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Category Data Found Successfully..',
            data
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Category Data Not Found..'
        })
    }
}

// Update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, endtime, playcoin, wincoin, priority, description } = req.body;

        const existingcategory = await categoryModel.findByPk(id);

        if (!existingcategory) {
            return res.status(404).send({
                message: 'Blog post not found',
                success: false
            });
        }

        let imagePath = existingcategory.image;
        if (req.file) {
            const baseUrl = process.env.IMAGE_URL;
            imagePath = `${baseUrl}/uploads/categories/${req.file.filename}`;

            // Delete old image if it exists
            if (existingcategory.image) {
                const oldImagePath = path.join(__dirname, '..', existingcategory.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedData = await categoryModel.update({
            image: imagePath,
            title,
            endtime,
            playcoin,
            wincoin,
            priority,
            description
        }, {
            where: { id }
        });

        return res.status(200).send({
            message: 'Category Updated successfully.',
            success: true,
            updatedData
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the category exists
        const category = await categoryModel.findOne({ where: { id: id } });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.',
            });
        }

        // Delete the category
        await categoryModel.destroy({
            where: { id: id },
        });

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully.',
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

module.exports = ({ AddCategory, ViewCategory, GetByID, Update, Delete })