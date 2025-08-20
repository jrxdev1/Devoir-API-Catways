require('dotenv').config(); 
const app = require('./app'); 
const connectDB = require('./config/db');

// Connexion à MongoDB
connectDB();

// Définir le port
const PORT = process.env.PORT || 5000;

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});