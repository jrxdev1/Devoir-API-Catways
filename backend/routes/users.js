const express = require('express');
const router = express.Router();
const { getUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail } = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);
router.put('/users/:email', updateUserByEmail);
router.delete('/users/:email', deleteUserByEmail);

module.exports = router;
