const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // On récupère le token depuis les cookies
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login'); // redirige vers login si pas de token
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/login'); // redirige aussi si token invalide
  }
};

module.exports = authMiddleware;


/*
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
*/
