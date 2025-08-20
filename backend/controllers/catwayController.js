const Catway = require('../models/Catway');

// Récupérer tous les catways
const getCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un catway par ID
const getCatwayByNumber = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /catways
const createCatway = async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /catways/:id
const updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCatway) return res.status(404).json({ message: 'Catway not found' });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /catways/:id
const deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!deletedCatway) return res.status(404).json({ message: 'Catway not found' });
    // Supprimer aussi les réservations liées au catway
    await Reservation.deleteMany({ catwayNumber: req.params.id });
    res.json({ message: 'Catway and related reservations deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCatways, getCatwayByNumber, createCatway, updateCatway, deleteCatway };