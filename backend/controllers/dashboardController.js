const Reservation = require('../models/Reservation');

const showDashboard = async (req, res) => {
  try {
    // Date du jour
    const today = new Date();

    // On récupère les réservations "en cours"
    const reservations = await Reservation.find({
      startDate: { $lte: today },
      endDate: { $gte: today }
    }).lean();

    // On rend la vue
    res.render('dashboard', {
      user: req.user,
      today: today.toLocaleDateString("fr-FR"),
      reservations
    });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

module.exports = {
  showDashboard
};