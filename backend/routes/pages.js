const express = require('express');
const { loginPage } = require('../controllers/authController');
const { renderCatwaysPage } = require('../controllers/catwayController');
const { renderReservationsPage } = require('../controllers/reservationController');
const { renderUsersPage } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index');
});

// Page login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', loginPage);

// Page register
router.get('/register', (req, res) => {
  res.render('register');
});

// Page logout
router.post('/logout', (req, res) => {
  // Supprime le cookie en l'expirant immédiatement
  res.clearCookie("token");
  // Redirection vers la page de connexion
  res.redirect('/login');
});


// Page dashboard (accessible après login)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard');
});

// Page catways
router.get('/catways', authMiddleware, renderCatwaysPage);

// Page réservations
router.get('/reservations', authMiddleware, renderReservationsPage);

// Page utilisateurs
router.get('/users', authMiddleware, renderUsersPage);

module.exports = router;
