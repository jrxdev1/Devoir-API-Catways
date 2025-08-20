const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Devoir API de gestion des catways');
});



// const userRoutes = require('./routes/users');

const catwaysRoutes = require('./routes/catways');
app.use('/catways', catwaysRoutes);

const reservationRoutes = require('./routes/reservations');
app.use('/', reservationRoutes);


//Prochaines routes :
  // app.use('/users', userRoutes);

// const reservationRoutes = require('./routes/reservations');



module.exports = app;