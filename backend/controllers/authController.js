const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

//Pour les pages API
// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l’utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login pour la page EJS
// Connexion
const loginPage = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l’utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login',{ message: "Utilisateur introuvable" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('login',{ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Stocker le token dans un cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // mettre true si HTTPS en prod
      maxAge: 3600000  // 1h
    });

    // Redirection si connexion réussie
    res.redirect('/dashboard');

  } catch (error) {
    console.error(error);  
    return res.render('login',{ error: "Erreur serveur, réessayez plus tard" });
  }
};

module.exports = { login, loginPage };
