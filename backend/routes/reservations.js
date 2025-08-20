const express = require('express');
const router = express.Router();
const { getAllReservations, getReservationsByCatway, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');

// GET toutes les réservations (tous les catways)
router.get('/reservations', getAllReservations);

// GET toutes les réservations d’un catway
router.get('/catways/:id/reservations', getReservationsByCatway);

// POST une réservation
router.post('/catways/:id/reservations', createReservation);

// PUT une réservation
router.put('/catways/:id/reservations/:idReservation', updateReservation);

// DELETE une réservation
router.delete('/catways/:id/reservations/:idReservation', deleteReservation);

module.exports = router;
