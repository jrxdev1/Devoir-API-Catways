const express = require('express');
const router = express.Router();
const { getUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:email', getUserByEmail);
router.post('/', createUser);
router.put('/:email', updateUserByEmail);
router.delete('/:email', deleteUserByEmail);

module.exports = router;
