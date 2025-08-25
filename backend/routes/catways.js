// routes/catways.js
const express = require('express');
const router = express.Router();
const reservationRoutes = require('./reservations');
const { getCatways, getCatwayByNumber, createCatway, updateCatway, deleteCatway, renderCatwaysPage } = require('../controllers/catwayController');


// Routes imbriquées :
router.use('/:id/reservations', reservationRoutes);

//Récupérer tous les catways
router.get('/', getCatways);

// Récupérer un catway par ID
router.get('/:id', getCatwayByNumber);

// POST un nouveau catway
router.post('/', createCatway);

// PUT un catway
router.put('/:id', updateCatway);

// DELETE un catway
router.delete('/:id', deleteCatway);


module.exports = router;