const Reservation = require('../models/Reservation');


// Récupérer toutes les réservations (tous les catways confondus)

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toutes les réservations d’un catway
const getReservationsByCatway = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await Reservation.find({ catwayNumber: Number(id) });

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'Aucune réservation trouvée pour ce catway' });
    }

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les réservations d’un client avec le n° du catway
const getReservationsById = async (req, res) => {
  try {
      const { id, idReservation } = req.params;

      // On cherche UNE seule réservation qui correspond
      const reservation = await Reservation.findOne({
        _id: idReservation,
        catwayNumber: id
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }

      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle réservation
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

// Modifier une réservation
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

// Supprimer une réservation
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

//Page ejs

const renderReservationsPage = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations });
  } catch (error) {
    res.status(500).send("Erreur lors du chargement des réservations");
  }
};


module.exports = { getAllReservations, getReservationsById, createReservation, updateReservation, deleteReservation, renderReservationsPage, getReservationsByCatway };