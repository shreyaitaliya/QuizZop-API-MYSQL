const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const fs = require('fs');
const path = require('path');
const SettingModel = require("../models/settingModel")(sequelize, DataTypes);
require('dotenv').config();

const AddSetting = async (req, res) => {
    try {
        const { bgcolor, loginbuttoncolor, loginbuttonbordercolor, title, cardcolor, bordercolor, headingtextcolor, textcolor, titlebuttoncolor, correctanscolor, wronganscolor } = req.body;

        let imagePath = "";
        if (req.file) {
            const baseUrl = process.env.IMAGE_URL;
            imagePath = `${baseUrl}/uploads/settings/${req.file.filename}`;
        }

        const data = await SettingModel.create({
            bgcolor,
            loginbuttoncolor,
            loginbuttonbordercolor,
            title,
            cardcolor,
            bordercolor,
            headingtextcolor,
            textcolor,
            titlebuttoncolor,
            correctanscolor,
            wronganscolor,
            logo: imagePath
        });

        return res.status(200).send({
            success: true,
            message: 'Setting Added Successfully..',
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

// View Data       
const GetByAllData = async (req, res) => {
    try {
        const FindData = await SettingModel.findOne({ where: { id: 1 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Found Data...',
                Data
            })
        }

        const Data = {
            id: FindData.id,
            logo: FindData.logo,
            title: FindData.title,
            themecolor: {
                bgcolor: FindData.bgcolor,
                loginbuttoncolor: FindData.loginbuttoncolor,
                loginbuttonbordercolor: FindData.loginbuttonbordercolor,
                cardcolor: FindData.cardcolor,
                bordercolor: FindData.bordercolor,
                headingtextcolor: FindData.headingtextcolor,
                textcolor: FindData.textcolor,
                titlebuttoncolor: FindData.titlebuttoncolor,
                correctanscolor: FindData.correctanscolor,
                wronganscolor: FindData.wronganscolor,
            },
        };

        return res.status(200).send({
            success: true,
            message: 'Viewed Data',
            Data
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
        const id = req.params.id;

        const Data = await SettingModel.findByPk(id)
        if (!Data) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Found Data...',
                Data
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Viewed Data',
            Data
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
        const { bgcolor, loginbuttoncolor, loginbuttonbordercolor, title, cardcolor, bordercolor, headingtextcolor, textcolor, titlebuttoncolor, correctanscolor, wronganscolor } = req.body;

        const Data = await SettingModel.findOne({ where: { id: id } })
        if (!Data) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Found Data...',
                Data
            })
        }

        let imagePath = Data.image;
        if (req.file) {
            const baseUrl = process.env.IMAGE_URL;
            imagePath = `${baseUrl}/uploads/settings/${req.file.filename}`;

            // Delete old image if it exists
            if (Data.image) {
                const oldImagePath = path.join(__dirname, '..', Data.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const update = await SettingModel.update({ logo: imagePath, bgcolor, loginbuttoncolor, loginbuttonbordercolor, title, cardcolor, bordercolor, headingtextcolor, textcolor, titlebuttoncolor, correctanscolor, wronganscolor }, {
            where: { id }
        })

        return res.status(200).send({
            success: true,
            message: 'Update Data',
            update
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

//Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const setting = await SettingModel.findOne({ where: { id: id } });
        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'setting not found.',
            });
        }

        await SettingModel.destroy({
            where: { id: id },
        });

        return res.status(200).json({
            success: true,
            message: 'setting deleted successfully.',
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

module.exports = ({ AddSetting, GetByAllData, GetByID, Update, Delete })