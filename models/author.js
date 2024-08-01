const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date_of_birth: {
    type: Date,
  },
  date_of_death: {
    type: Date,
  },
});

authorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
    return fullname;
  }
});

authorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

authorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : '';
});

authorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : '';
});

authorSchema.virtual('lifespan').get(function () {
  if (this.date_of_birth && this.date_of_death) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  }
});

module.exports = mongoose.model('Author', authorSchema);
