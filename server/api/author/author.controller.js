'use strict';

var _ = require('lodash');
var Author = require('./author.model');

// Get list of Author
exports.index = function(req, res) {
  var q = req.query;
  // setTimeout(function(){
    Author.find(q, function (err, authors) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(authors);
    });
  // },1000);
};

// Get a single Author
exports.show = function(req, res) {
  Author.findById(req.params.id, function (err, author) {
    if(err) { return handleError(res, err); }
    if(!author) { return res.status(404).send('Not Found'); }
    return res.json(author);
  });
};

// Creates a new author in the DB.
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

  Author.create(req.body, function(err, author) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(author);
  });
};

// Updates an existing author in the DB.
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

  Author.findById(req.params.id, function (err, author) {
    if (err) { return handleError(res, err); }
    if(!author) { return res.status(404).send('Not Found'); }
    var updated = _.merge(author, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(author);
    });
  });
};

// Deletes a author from the DB.
exports.destroy = function(req, res) {
  author.findById(req.params.id, function (err, author) {
    if(err) { return handleError(res, err); }
    if(!author) { return res.status(404).send('Not Found'); }
    author.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
