const { Schema } = require('mongoose')

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  description: { type: String, required: false },
  type: {
    type: String,
    required: true,
    enum: ['Charge', 'Debit']
  }
}, {
  toJSON: { virtuals: true }
})

module.exports = transactionSchema
