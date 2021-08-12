const httpStatus = require('http-status');
const { SeaBin } = require('../models');

/**
 * Create a SeaBin
 * @param {Object} SeaBinBody
 * @returns {Promise<SeaBin>}
 */
 const createSeaBin = async (SeaBinBody) => {
    const SeaBin = await SeaBin.create(SeaBinBody);
    return SeaBin;
  };

  module.exports = {
    createSeaBin
  };