const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  carModel: { type: String, required: true },
  issueDescription: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
  estimatedTime: { type: String },
  price: { type: Number },
  parts: [{ name: String, supplier: String, verified: Boolean }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
