const express = require('express');
const router = express.Router();
const { getCars, addCar, updateCarStatus, deleteCar } = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCars).post(protect, addCar);
router.route('/:id').patch(protect, updateCarStatus).delete(protect, deleteCar);

module.exports = router;
