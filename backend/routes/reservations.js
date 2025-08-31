const express = require('express');
const router = express.Router();
const { getAllReservations, getReservationsById, createReservation, updateReservation, deleteReservation, getReservationsByCatway } = require('../controllers/reservationController');

// GET toutes les réservations (tous les catways)
router.get('/reservations', getAllReservations);

// Toutes les réservations d’un catway
router.get('/catways/:id/reservations', getReservationsByCatway);

// GET toutes les réservations d’un catway avec le nom de l'utilisateur
router.get('/:id/reservations/idReservation', getReservationsById);

// POST une réservation
router.post('/:id/reservations', createReservation);

// PUT une réservation
router.put('/:id/reservations/:idReservation', updateReservation);

// DELETE une réservation
router.delete('/:id/reservations/:idReservation', deleteReservation);

module.exports = router;
