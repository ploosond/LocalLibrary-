const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const bookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  imprint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: {
    type: Date,
    default: Date.now,
  },
});

bookInstanceSchema.virtual('url').get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

bookInstanceSchema.virtual('due_back_formatted').get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

bookInstanceSchema.virtual('due_back_yyyy_mm_dd').get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate();
});

module.exports = mongoose.model('BookInstance', bookInstanceSchema);
