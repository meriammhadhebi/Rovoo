const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema(
  {
    
    DateDebut: {
        type: Date,
        default: new Date()
    },  
    DateFin: {
        type: Date,
        default: new Date()
    },  
    Adresse: {
        type: String,
        required: true,
    },
    prix: {
        type: String,
        required: true,
        default: '0'
    },
    seabin: { type: Schema.Types.ObjectId, ref: 'SeaBin', required: false, default: null},
    client: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    driver: { type: Schema.Types.ObjectId, ref: 'User', required: false, default: null},
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef Reservation
 */
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
