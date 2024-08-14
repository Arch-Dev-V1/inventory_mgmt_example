const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      street: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zip: {
        type: String
      },
      country: {
        type: String
      }
    }
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

module.exports = mongoose.model('Supplier', SupplierSchema);
