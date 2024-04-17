

const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  ts: { type: Date, required: true },
  machine_status: { type: Number, required: true },
  vibration: { type: Number, required: true }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
