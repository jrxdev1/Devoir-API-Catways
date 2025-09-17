const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // On récupère le token depuis les cookies
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login"); // redirige vers login si pas de token
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login"); // redirige aussi si token invalide
  }
};

module.exports = authMiddleware;
