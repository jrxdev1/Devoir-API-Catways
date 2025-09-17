require('dotenv').config(); 
const app = require('./app'); 
const connectDB = require('./config/db');

// Connexion à MongoDB
connectDB();

// Définir le port
const PORT = process.env.PORT || 5000;

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});