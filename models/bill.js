const mongoose = require('mongoose');


const BillSchema = new mongoose.Schema({
  bill_date: { type: Date, required: true },
  party: { type: String, required: true },
  vhicle_number: { type: String, required: true },
  type: { type: String, required: true },
  responsible: { type: String, required: true },
  restriction: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, required: true },
  diq_price: { type: Number, required: true },
  usd_price: { type: Number, required: true },
  details: { type: String, required: true },
  note: { type: String }
});

const Bill = mongoose.model('Bill',BillSchema);

module.exports = Bill;
