const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const FooterModel = require("../models/footerModel")(sequelize, DataTypes);
require('dotenv').config();

const AddData = async (req, res) => {
    try {
        const { pagename, description, path } = req.body;

        // const pathurl = `${process.env.PAGE_URL}/${path}`;

        const data = await FooterModel.create({
            pagename, description, path
            // : pathurl 
        });

        return res.status(200).send({
            success: true,
            message: 'Data Added Successfully..',
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

const GetAllData = async (req, res) => {
    try {
        const data = await FooterModel.findAll({});
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find The Data..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Data List Viewed Successfully..',
            data
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: message.error
        })
    }
}


const GetById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await FooterModel.findOne({ where: { id: id } });
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find The Data...'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Data Find Successfully..',
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

const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { pagename, description, path } = req.body;

        const FindData = await FooterModel.findOne({ where: { id: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Data Can Not Found..'
            })
        }

        // const pathurl = `${process.env.PAGE_URL}/${path}`;

        const Update = await FooterModel.update({
            pagename, description, path
            // : pathurl
        }, { where: { id: id } });

        return res.status(200).send({
            success: true,
            message: 'Data Updated Successfully..',
            Update
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const FindData = await FooterModel.findOne({ where: { id: id } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find Data...'
            })
        }

        const Delete = await FooterModel.destroy({ where: { id: id } })

        return res.status(200).send({
            success: true,
            message: 'Data Deleted Successfully..'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const GetByList = async (req, res) => {
    try {
        const FindList = await FooterModel.findAll({});
        if (!FindList) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find The Data..'
            })
        }

        const pageNames = FindList.map(item => item.pagename);

        return res.status(200).send({
            success: true,
            message: 'Data List Viewed Successfully..',
            data: pageNames
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = ({
    AddData, GetById, Update, Delete, GetByList, GetAllData
})