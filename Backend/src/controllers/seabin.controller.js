const mongoose = require('mongoose');
const seabinModel = require('../models/seabin.model');


const createSeaBin = async (req, res, next) => {
  const seabin = req.body;
  const newSeabBin = new seabinModel(seabin);
  try {
    await newSeabBin.save();
    res.status(201).json(newSeabBin);
  } catch (error) {
    next(error);
  }
};
const getSeaBins = async (req, res, next) => {
  try {
    const doc = await seabinModel.find();

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const getSeaBinById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await seabinModel.findById(id);

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const DeleteSeabin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No seabin Found with id : ${id} ');
  await seabinModel.findByIdAndRemove(id)
  res.json({ message: 'deleted successfully.' });
};
const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateseabin = { status: 'actif' };

    await seabinModel.findByIdAndUpdate(id, updateseabin, { new: true });
  res.json({ message: "status updated successfully." });
} catch (error) {
    next(error);
  }
  
}



module.exports = {
  createSeaBin,
  getSeaBins,
  DeleteSeabin,
  updateStatus,
  getSeaBinById,
};
