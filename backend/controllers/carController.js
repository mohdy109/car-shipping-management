const Car = require('../models/Car');

const getCars = async (req, res) => {
  const { page = 1, limit = 10, make, model, year, shippingStatus } = req.query;
  const query = {};
  if (make) query.make = make;
  if (model) query.model = model;
  if (year) {
    // Validate if `year` is a number
    if (isNaN(year) || !Number.isInteger(parseFloat(year))) {
      return res.status(400).json({ message: 'Invalid year value. Please provide a valid number.' });
    }
    query.year = Number(year);
  }

  if (shippingStatus) query.shippingStatus = shippingStatus;

  try {
    const cars = await Car.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Car.countDocuments(query);
    res.json({
      cars,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCar = async (req, res) => {
  const { make, model, year, vin, shippingStatus } = req.body;
  const newCar = new Car({ make, model, year, vin, shippingStatus });
  try {
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCarStatus = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { shippingStatus: req.body.shippingStatus }, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCars, addCar, updateCarStatus, deleteCar };
