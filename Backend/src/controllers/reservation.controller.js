const mongoose = require('mongoose');
const reservationModel = require('../models/reservation.model');


const createReservation = async (req, res,next) => { 
    const { DateDebut, DateFin, Adresse, prix,client } = req.body;
    const reservation = {DateDebut, DateFin, Adresse, prix,client, seabin: req.params.idseabin };
    const newReservation = new reservationModel(reservation);
   try {
      
       await newReservation.save();
       res.status(201).json(newReservation);

   } catch (error) {

      next(error);
   
   }
}




module.exports = {
  createReservation,
};
