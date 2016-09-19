'use strict';

var Todo = require('./models/todo');

var todos = [
	'Wash the Touareg',
	'Bathe the dogs',
	'Shower the boys'
];

todos.forEach(function (todo, index) {
  Todo.find({ 'task': todo }, function(err, todos) {
  	if (!err && !todos.length) {
      Todo.create({ task: todo, priority: "b_medium", complete: false, groupRefId: 1 });
  	}
  });
});
