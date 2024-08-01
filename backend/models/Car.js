const mongoose = require('mongoose');


const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true },
  shippingStatus: { type: String, required: true, default: 'Pending' },
});

module.exports = mongoose.model('Car', CarSchema);
