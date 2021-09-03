const express = require('express');
const seabinController = require('../../controllers/seabin.controller');

const router = express.Router();

router
  .route('/')
  .post(seabinController.createSeaBin)
  .get(seabinController.getSeaBins)
router
  .route('/:id')
  .delete(seabinController.DeleteSeabin)
  .patch(seabinController.updateStatus)
  .get(seabinController.getSeaBinById)


module.exports = router;

 /**
   * @swagger
   * /seabin:
   *   post:
   *     description: Create a seabin
   *     parameters:
   *      - localisation: Marsa
   *        volume: 2L
   *        energy: High
   *        type: string
   *     responses:
   *       201:
   *         description: Connected
   */

 /**
   * @swagger
   * /seabin:
   *   get:
   *     description: Get all seabins
   *     responses:
   *       200:
   *         description: Success
   * 
   */
 /**
   * @swagger
   * /seabin/:id:
   *   patch:
   *     description: update status of a seabin
   *     responses:
   *       201:
   *         description: Connected
   */
 /**
   * @swagger
   * /seabin/:id:
   *   delete:
   *     description: delete a seabin
   *     responses:
   *       201:
   *         description: Connected
   */


