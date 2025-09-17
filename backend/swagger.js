const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Catways API',
    description: 'Documentation de l’API de gestion des catways et réservations',
  },
  host: 'localhost:5000', 
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/auth.js',
  './routes/catways.js',
  './routes/reservations.js',
  './routes/users.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
