const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const RulesModel = require("../models/rulesModel")(sequelize, DataTypes);

// AddRules
// const AddRules = async (req, res) => {
//     try {
//         const { rules } = req.body;

//         // if (!Array.isArray(rules)) {
//         //     return res.status(400).send({
//         //         success: false,
//         //         message: 'Invalid data format for rules. It should be an array.',
//         //     });
//         // }

//         // Retrieve the existing data    
//         // const existingData = await RulesModel.findOne({ where: { id: 1 } });

//         // let combinedRules;
//         // if (existingData) {
//         //     const existingRules = existingData.rules ? JSON.parse(existingData.rules) : [];

//         //     if (!Array.isArray(existingRules)) {
//         //         throw new Error('Existing rules data is not in the expected array format.');
//         //     }

//         //     combinedRules = [...existingRules, ...rules];
//         //     existingData.rules = JSON.stringify(combinedRules);
//         //     await existingData.save();
//         // } else {
//         //     combinedRules = rules;
//         //     await RulesModel.create({ rules: JSON.stringify(combinedRules) });
//         // }
//         const existingData = await RulesModel.findOne({ where: { id: 1 } });

//         const data = await existingData.create({ rules })

//         return res.status(200).send({
//             success: true,
//             message: existingData ? 'Rules updated successfully.' : 'Rules added successfully.',
//             data
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(400).send({
//             success: false,
//             message: error.message || 'An unexpected error occurred.',
//         });
//     }
// };

const AddRules = async (req, res) => {
    try {
        const { rules } = req.body;

        // Check if any existing rules already exist
        const existingRules = await RulesModel.findOne({ where: { id: 1 } });

        if (existingRules) {
            return res.status(400).send({
                success: false,
                message: 'Rules already exist. Cannot add more than one set of rules.',
            });
        }
     
        // If no existing rules, create the new record
        const data = await RulesModel.create({ rules });

        return res.status(200).send({   
            success: true,
            message: 'Rules updated successfully.',
            data,
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: error.message || 'An unexpected error occurred.',
        });
    }
};

// GetAllData  
const GetAllData = async (req, res) => {
    try {
        const Data = await RulesModel.findAll({});
        if (!Data) {
            return res.status(400).send({
                success: false,
                message: 'Data Can Not Found..'
            })
        }
        return res.status(200).send({
            success: false,
            message: 'Data Viewed Successfully...',
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
const GetById = async (req, res) => {
    try {
        const id = req.params.id;

        const Data = await RulesModel.findByPk(id)
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
        const { rules } = req.body;  

        const Data = await RulesModel.findByPk(id);
        if (!Data) {
            return res.status(400).send({
                success: false,
                message: 'Cannot find data...',
            });
        }

        // Update the data with the new rules   
        const Update = await RulesModel.update(
            { rules },
            { where: { id: id } } 
        );

        return res.status(200).send({
            success: true,
            message: 'Data updated successfully',
            Update
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

//delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the category exists
        const rules = await RulesModel.findOne({ where: { id: id } });
        if (!rules) {
            return res.status(404).json({
                success: false,
                message: 'rules not found.',
            });
        }

        // Delete the category
        await RulesModel.destroy({
            where: { id: id },
        });

        return res.status(200).json({
            success: true,
            message: 'rules deleted successfully.',
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
    AddRules, GetAllData, GetById, Update, Delete
}) 