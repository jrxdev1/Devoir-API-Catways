const Reservation = require('../models/Reservation');
const User = require ('../models/User')

const showDashboard = async (req, res) => {
  try {
    // Date du jour
    const today = new Date();

    // On récupère les réservations "en cours"
    const reservations = await Reservation.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
      username: req.params.id
    }).lean();

    // On récupère le nom de l'utilisateur connecté 
    const user = await User.findById(req.user.id).lean();

    // On rend la vue
    res.render('dashboard', {
      user,
      today: today.toLocaleDateString("fr-FR"),
      reservations,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

module.exports = { showDashboard };

