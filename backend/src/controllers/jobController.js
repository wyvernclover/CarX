const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { user, carModel, issueDescription, price, parts } = req.body;
    if (!user || !carModel || !issueDescription) return res.status(400).json({ message: 'Missing fields' });
    const job = await Job.create({ user, carModel, issueDescription, price, parts });
    res.status(201).json({ message: 'Job created', jobId: job._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    job.status = status;
    await job.save();
    res.json({ message: 'Job updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.find({ user: userId }).populate('vendor').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobsByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const jobs = await Job.find({ vendor: vendorId }).populate('user').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
