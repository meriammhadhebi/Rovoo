const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { seabinService } = require('../services');

const createSeaBin = catchAsync(async (req, res) => {
  const seabin = await seabinService.createSeaBin(req.body);
  res.status(httpStatus.CREATED).send(seabin);
});