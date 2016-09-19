'use strict';

var mongoose = require('mongoose');

// todo.name
// todo.completed

var todoSchema = new mongoose.Schema({
	task: String,
	priority: String,
	complete: Boolean,
	groupRefId: Number
});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;