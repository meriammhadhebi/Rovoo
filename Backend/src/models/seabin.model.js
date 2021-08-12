const mongoose = require('mongoose');

const seabinSchema = mongoose.Schema(
  {
    localisation: {
      type: String,
      required: true,
      trim: true,
    },
    volume: {
      type: String,
      required: true,
    },
    energy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'nonactif'
    },
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef SeaBin
 */
const SeaBin = mongoose.model('SeaBin', seabinSchema);

module.exports = SeaBin;
