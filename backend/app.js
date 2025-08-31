const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Pour le CSS
app.use(express.static(path.join(__dirname, 'public')));


// Pages EJS
const pagesRoutes = require('./routes/pages');
app.use('/', pagesRoutes);

const { renderCatwaysPage } = require ('./controllers/catwayController');
app.get('/catways', renderCatwaysPage);


// Routes API
const catwaysRoutes = require('./routes/catways');
app.use('/catways', catwaysRoutes);

const reservationRoutes = require('./routes/reservations');
app.use('/catways', reservationRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


module.exports = app;