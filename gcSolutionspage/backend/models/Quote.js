const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Quote', quoteSchema);