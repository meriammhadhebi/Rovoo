const express = require('express');
const reservationController = require('../../controllers/reservation.controller');

const router = express.Router();

router.route('/').post(reservationController.createReservation )
                 .get(reservationController.getReservations)
router.route('/:id').get(reservationController.getReservationsbySeabin)
                    .patch(reservationController.affectreservation)
router.route('/driver/:iddriver').get(reservationController.getReseravtionByDriver)


module.exports = router;
 /**
   * @swagger
   * /reservation:
   *   post:
   *     description: reserver un seabin
   *     parameters:
   *      - DateDebut: date type
   *        DateFin: date type
   *        Adresse: String
   *        prix: String
   *        client: idclient (body)
   *        seabin: idseabin (param)
   *     responses:
   *       201:
   *         description: Connected
   */
 /**
   * @swagger
   * /reservation:
   *   get:
   *     description: Get reservations by seabin id 
   *     parameters:
   *      - idseabin: 611a3803eee52458f8d526e7
   *     responses:
   *       200:
   *         description: Success
   * 
   */
