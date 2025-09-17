const express = require('express');
const router = express.Router();
const { getAllReservations, getReservationsById, createReservation, updateReservation, deleteReservation, getReservationsByCatway, getReservationsByName } = require('../controllers/reservationController');

// Récupérer toutes les réservations (tous les catways)
router.get('/', getAllReservations);

// Récupérer outes les réservations d’un catway
router.get('/catways/:id/reservations', getReservationsByCatway);

// Récupérer toutes les réservations d’un catway avec le nom de l'utilisateur
router.get('/:clientName', getReservationsByName);

// Créer une réservation
router.post('/:id/reservations', createReservation);

// Modifier une réservation
router.put('/:id/reservations/:idReservation', updateReservation);

// Suppriemr une réservation
router.delete('/:id/reservations/:idReservation', deleteReservation);

module.exports = router;
