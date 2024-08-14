const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['IN', 'OUT'], // IN for adding to inventory, OUT for removing from inventory
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
