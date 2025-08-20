const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
};

module.exports = connectDB;

// mongodb+srv://apicatways:admin123@catways.bjsk6fm.mongodb.net/?retryWrites=true&w=majority&appName=Catways


// mongodb+srv://admincatways:admin123@catwaysapi.yckgmii.mongodb.net/?retryWrites=true&w=majority&appName=CatwaysAPI
// admin123

// mongodb+srv://admincatways:admin123@catwaysapi.yckgmii.mongodb.net/