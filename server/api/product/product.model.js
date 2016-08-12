'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  sku: String,
  name: String,
  name_ar:String,
  nameLower: String,
  slug: String,
  author: {_id: String, name: String, name_ar: String, info: String, infor_ar: String,image:String },
  status: String,
  publisher: {_id: String, name: String, name_ar: String},
  info: String,
  uid: String,
  variants: Array,
  features: Array,
  keyFeatures: Array,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now}
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema);
