const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.put('/:jobId/status', jobController.updateJobStatus);
router.get('/user/:userId', jobController.getJobsByUser);
router.get('/vendor/:vendorId', jobController.getJobsByVendor);

module.exports = router;
