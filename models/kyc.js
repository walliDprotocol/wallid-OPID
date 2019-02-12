'use strict';

const conn = require('./db.js');
const schema = new conn.schema({
  idt: {
    type: String,
    required: true,
  },
  wa: {
    type: String,
    required: true,
    lowercase: true
  },
  opid: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

schema.index({
  idt: 1,
  wa: 1
},
{
  unique: true
});

const model = conn.model('kyc', schema);

let kyc = {
  findById: function (criteria, callback) {
    return model.findOne(criteria, { '_id': false, '__v': false }, callback);
  },
  addOrUpdateInfo: function (criteria, data, callback) {
    return model.findOneAndUpdate(criteria, { $set: data } , { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true }, callback );
  }
}

module.exports = kyc;
