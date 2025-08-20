// controllers/reservationController.js
const Reservation = require('../models/Reservation');


// GET toutes les réservations (tous les catways confondus)

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET toutes les réservations d’un catway
const getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET une réservation précise
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST une nouvelle réservation
const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation({
      catwayNumber: req.params.id, // vient de l’URL
      clientName: req.body.clientName,
      boatName: req.body.boatName,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });

    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (modifier une réservation)
const updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation, catwayNumber: req.params.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE une réservation
const deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllReservations, getReservationsByCatway, createReservation, updateReservation, deleteReservation };