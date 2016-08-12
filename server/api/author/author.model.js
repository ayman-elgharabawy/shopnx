'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: String,
  name_ar: String,
  info: String,
  infor_ar: String,
  image: String,
  uid: String,

  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Author', AuthorSchema);
