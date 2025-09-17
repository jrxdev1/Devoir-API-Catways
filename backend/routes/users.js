const express = require('express');
const router = express.Router();
const { getUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail } = require('../controllers/userController');

// Récupérer tous les utilisateurs
router.get('/', getUsers);

// Récupérer tous les utilisateurs avec leur mail
router.get('/:email', getUserByEmail);

// Créer un utilisateur
router.post('/', createUser);

// Modifier un utilisateur
router.put('/:email', updateUserByEmail);

// Supprimer un utilisateur
router.delete('/:email', deleteUserByEmail);

module.exports = router;
