const User = require('../models/User');
const bcrypt = require('bcrypt');

// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur en particulier via son email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un utilisateur (ce qui permettre de gérer sno inscription)
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });

    const saved = await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé', user: saved });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modifier un utilisateur via son email
const updateUserByEmail = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    ).select('-password');

    if (!updated) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur via son email
const deleteUserByEmail = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ email: req.params.email });
    if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route ejs

const renderUsersPage = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('users', { users });
  } catch (error) {
    res.status(500).send("Erreur lors du chargement des utilisateurs");
  }
};


module.exports = { getUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail, renderUsersPage };

