const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  partName: { type: String, required: true },
  supplier: { type: String, required: true },
  authenticityRating: { type: Number, min: 0, max: 5, default: 0 },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
}, { timestamps: true });

module.exports = mongoose.model('PartVerification', partSchema);
