const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/register', vendorController.registerVendor);
router.put('/:vendorId/verify', vendorController.verifyVendor);
router.get('/', vendorController.listVendors);

module.exports = router;
