const Vendor = require('../models/Vendor');
const User = require('../models/User');

exports.registerVendor = async (req, res) => {
  try {
    const { userId, nin, services } = req.body;
    if (!userId || !nin) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = await Vendor.findOne({ nin });
    if (existing) return res.status(400).json({ message: 'NIN already registered' });
    const vendor = await Vendor.create({ user: user._id, nin, services });
    res.status(201).json({ message: 'Vendor created', vendorId: vendor._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    vendor.verified = true;
    await vendor.save();
    res.json({ message: 'Vendor verified' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('user', 'name phone');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
