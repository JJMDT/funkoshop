const { getAll, getOne } = require('../models/productModels');

const getAllItems = async (params) => {
    try {
        const data = await getAll(params);
        console.log("Data from getAllItems:", data);
        return data;
    } catch (error) {
        console.error("Error in getAllItems:", error);
        throw error;
    }
}



module.exports = {
    getAllItems,
    getOne
};
