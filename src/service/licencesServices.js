const { getAll } = require('../models/licencesModels');

const getAllLicences = async (params) => {

    // if params tal cosa
    //  else params tal otra

    const data = getAll(params);

    return data;
}

module.exports = {
    getAllLicences
};