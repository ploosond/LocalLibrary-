const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Genre',
    },
  ],
});

bookSchema.virtual('url').get(function () {
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model('Book', bookSchema);
