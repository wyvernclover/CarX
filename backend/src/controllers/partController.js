const PartVerification = require('../models/PartVerification');

exports.addPart = async (req, res) => {
  try {
    const { partName, supplier, authenticityRating, verifiedBy } = req.body;
    if (!partName || !supplier) return res.status(400).json({ message: 'Missing fields' });
    const part = await PartVerification.create({ partName, supplier, authenticityRating, verifiedBy });
    res.status(201).json({ message: 'Part added', partId: part._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listParts = async (req, res) => {
  try {
    const parts = await PartVerification.find().sort({ createdAt: -1 });
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.filterByRating = async (req, res) => {
  try {
    const { minRating } = req.query;
    const q = {};
    if (minRating) q.authenticityRating = { $gte: Number(minRating) };
    const parts = await PartVerification.find(q).sort({ authenticityRating: -1 });
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
