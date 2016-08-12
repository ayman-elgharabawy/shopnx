/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Author = require('./author.model');

exports.register = function(socket) {
  Author.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Author.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('author:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('author:remove', doc);
}