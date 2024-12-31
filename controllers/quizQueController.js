const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const QuizQueModel = require("../models/quizQueModel")(sequelize, DataTypes);
const categoryModel = require("../models/categoryModel")(sequelize, DataTypes);

// Add Data    
const AddData = async (req, res) => {
    try {
        const { question, A, B, C, D, answer, categoryId } = req.body

        const FindCategory = await categoryModel.findOne({ where: { id: categoryId } })
        if (!FindCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category Can Not Found..'
            })
        }

        const validChoices = new Set(['A', 'B', 'C', 'D']);
        if (!answer || [...answer].some((char) => !validChoices.has(char))) {
            return res.status(400).send({
                success: false,
                message: "Answer contains invalid characters. Only 'A', 'B', 'C', or 'D' are allowed.",
            });
        }

        const data = await QuizQueModel.create({ question, A, B, C, D, answer, categoryId })

        return res.status(200).send({
            success: false,
            message: 'QuizQuestion Added Successfully...',
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
        const data = await QuizQueModel.findAll({});
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'QuizQuestion Data Can Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'QuizQuestion Data View Successfully..',
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

        const data = await QuizQueModel.findOne({ where: { id: id } });
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'QuizQuestion Data Can Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'QuizQuestion Data View Successfully..',
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
        const { question, A, B, C, D, answer, categoryId } = req.body;

        const FindData = await QuizQueModel.findOne({ where: { id: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'QuizQuestion Data Cannot Be Found.',
            });
        }

        const FindCategory = await categoryModel.findOne({ where: { id: categoryId } });
        if (!FindCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category Cannot Be Found.'
            });
        }

        const validChoices = new Set(['A', 'B', 'C', 'D']);
        if (!answer || [...answer].some((char) => !validChoices.has(char))) {
            return res.status(400).send({
                success: false,
                message: "Answer contains invalid characters. Only 'A', 'B', 'C', or 'D' are allowed.",
            });
        }

        const updatedData = await QuizQueModel.update({ question, A, B, C, D, answer, categoryId }, { where: { id } });

        return res.status(200).send({
            message: 'Category Updated Successfully.',
            success: true,
            updatedData,
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

//Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the category exists
        const QuizQue = await QuizQueModel.findOne({ where: { id: id } });
        if (!QuizQue) {
            return res.status(404).json({
                success: false,
                message: 'QuizQue not found.',
            });
        }

        // Delete the category
        await QuizQueModel.destroy({
            where: { id: id },
        });

        return res.status(200).json({
            success: true,
            message: 'QuizQue deleted successfully.',
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

// Filter Data by Category
const GetQuestionsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Verify if category exists
        const FindCategory = await categoryModel.findOne({ where: { id: categoryId } });
        if (!FindCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category not found.',
            });
        }

        // Fetch questions by category
        const questions = await QuizQueModel.findAll({ where: { categoryId } });

        return res.status(200).send({
            success: true,
            message: 'Questions fetched successfully.',
            data: questions,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};


module.exports = ({
    AddData, ViewData, GetByID, Update, Delete, GetQuestionsByCategory
})