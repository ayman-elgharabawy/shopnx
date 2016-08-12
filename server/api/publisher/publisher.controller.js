'use strict';

var _ = require('lodash');
var Publisher = require('./publisher.model');

// Get list of publishers
exports.index = function(req, res) {
  var q = req.query;
  // setTimeout(function(){
    Publisher.find(q, function (err, publishers) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(publishers);
    });
  // },1000);
};

// Get a single publisher
exports.show = function(req, res) {
  Publisher.findById(req.params.id, function (err, publisher) {
    if(err) { return handleError(res, err); }
    if(!publisher) { return res.status(404).send('Not Found'); }
    return res.json(publisher);
  });
};

// Creates a new publisher in the DB.
exports.create = function(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Publisher.create(req.body, function(err, publisher) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(publisher);
  });
};

// Updates an existing publisher in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if(!req.body.slug && req.body.info)
  req.body.slug = req.body.info.toString().toLowerCase()
                      .replace(/\s+/g, '-')        // Replace spaces with -
                      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
                      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
                      .replace(/^-+/, '')          // Trim - from start of text
                      .replace(/-+$/, '');

  Publisher.findById(req.params.id, function (err, publisher) {
    if (err) { return handleError(res, err); }
    if(!publisher) { return res.status(404).send('Not Found'); }
    var updated = _.merge(publisher, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(publisher);
    });
  });
};

// Deletes a publisher from the DB.
exports.destroy = function(req, res) {
  Publisher.findById(req.params.id, function (err, publisher) {
    if(err) { return handleError(res, err); }
    if(!publisher) { return res.status(404).send('Not Found'); }
    publisher.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
