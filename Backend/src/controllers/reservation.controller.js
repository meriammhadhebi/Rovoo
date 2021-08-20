const mongoose = require('mongoose');
const reservationModel = require('../models/reservation.model');


const createReservation = async (req, res,next) => { 
    const { DateDebut, DateFin, Adresse, prix,client } = req.body;
    const reservation = {DateDebut, DateFin, Adresse, prix,client };
    const newReservation = new reservationModel(reservation);
   try {
      
       await newReservation.save();
       res.status(201).json(newReservation);

   } catch (error) {

      next(error);
   
   }
}


const getReservationsbySeabin = async (req, res, next) => {
    try {
      
      const doc = await reservationModel.find({seabin: req.params.idseabin});
  
      res.status(200).json(doc);
    } catch (error) {
      next(error);
    }
};
const getReservations = async (req, res, next) => {
      try {
        const doc = await reservationModel.find();
    
        res.status(200).json(doc);
      } catch (error) {
        next(error);
      }
};

const affectreservation = async (req, res, next) => {
  const { id } = req.params;
  const { idseabin,iddriver } = req.body;
  try {
    const updatedreservation = { seabin: mongoose.Types.ObjectId(idseabin) , driver: mongoose.Types.ObjectId(iddriver) };
    await reservationModel.findByIdAndUpdate(id, updatedreservation, { new: true });
  res.json({ message: "seabin reservation affected to driver successfully." });
} catch (error) {
    next(error);
  }
  
}
const getReseravtionByDriver = async (req, res, next) => {
  const { iddriver } = req.params;
  try {
    
    const doc = await reservationModel.find({driver: iddriver});
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createReservation,
  getReservations,
  getReservationsbySeabin,
  affectreservation,
  getReseravtionByDriver,
};
