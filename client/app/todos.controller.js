(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$filter', 'todoFactory', 'toastr'];

    /* @ngInject */
    function TodoController($filter, todoFactory, toastr) {
        var vm = this;
        var todos = {};
        var edit = {};

        //Methods
        vm.addNew = addNew;
        vm.removeRow = removeRow;
        vm.editRow = editRow;

        activate();

        ////////////////

        function activate() {
			
			// Initiates the todo list from the dB server
	    	todoFactory.getTodo().then(
	    		function (data) {
	    			vm.todos = data.todos;
	    		}
	    	);

			// Forces the list to only ve re-sorted vertically through drag and drop plug-in
			vm.sortableOptions = {
				'ui-floating': true
			};

			//Sorting functions since orderBy() needs to run in controller when drag and drop plugin is installed
			vm.todos = todos;

		 	console.log(vm.todos);
			vm.sortButton = function(sortList) {
		    console.log(sortList);
		    vm.reverse = (sortList !== null && vm.sortList === sortList) ? !vm.reverse : false;
		    vm.sortList = sortList;
		    vm.todos = $filter('orderBy')(vm.todos, vm.sortList, vm.reverse);
		  	};
        }

        // Adds the user input to the table
        function addNew(todo) {
        	vm.saving = true;
        	todoFactory.addTodo(todo).then(
        		function(newTodo){
        			vm.todos.push(newTodo.todo);
        			vm.saving = false;
					// Clears input after submission
					vm.newTodo.task = null;
					vm.newTodo.priority = 0;
	    			vm.newTodo.groupRefId = 0;
        		}
        	);
        }

    	// Updates the user input from the todo list
		function editRow(id, todo){				
			vm.saving = true;
			todoFactory.editTodo(id, todo).then(
				function() {
					vm.saving = false;	
				}
			);
		};

    	// Removes the user input from the todo list
		function removeRow(todo) {				
			vm.saving = true;
			todoFactory.deleteTodo(todo).then(
				function() {
					vm.saving = false;
					var index = vm.todos.indexOf(todo);
					vm.todos.splice(index, 1);
				}
			);
		}
    }
})();
