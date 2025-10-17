const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');

router.post('/', partController.addPart);
router.get('/', partController.listParts);
router.get('/filter', partController.filterByRating);

module.exports = router;
