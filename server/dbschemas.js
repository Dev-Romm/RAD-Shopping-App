const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  price: Number
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  orders: [orderSchema]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer };
