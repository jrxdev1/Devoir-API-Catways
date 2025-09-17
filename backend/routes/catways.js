const express = require('express');
const router = express.Router();
const { getCatways, getCatwayByNumber, createCatway, updateCatway, deleteCatway } = require('../controllers/catwayController');

// Récupérer tous les catways
router.get('/', getCatways);

// Récupérer un catway par ID
router.get('/:id', getCatwayByNumber);

// Créer un nouveau catway
router.post('/', createCatway);

// Modifier un catway
router.put('/:id', updateCatway);

// Supprimer un catway
router.delete('/:id', deleteCatway);


module.exports = router;