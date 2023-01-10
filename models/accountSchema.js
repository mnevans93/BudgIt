const { Schema } = require('mongoose')
const transactionSchema = require('./transactionSchema')

const accountSchema = new Schema({
  nickname: { type: String, required: true },
  type: {
    type: String,
    enum: ['Bank Account', 'Credit Card'],
    required: true
  },
  initBalance: { type: Number, required: true },
  transactions: [transactionSchema],
  currentBalance: { type: Number, required: true }
}, {
  toJSON: { virtuals: true },
  id: false
})

module.exports = accountSchema
