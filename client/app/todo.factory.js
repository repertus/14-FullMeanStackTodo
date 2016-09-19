(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('todoFactory', todoFactory);

    todoFactory.$inject = ['$http', '$q', 'toastr'];

    /* @ngInject */
    function todoFactory($http, $q, toastr) {
        var service = {
            getTodo: getTodo,
            addTodo: addTodo,
            editTodo: editTodo,
            deleteTodo: deleteTodo
        };
        return service;

        ////////////////

        function getTodo() {
        	var defer = $q.defer();
            $http.get('http://localhost:3000/api/todos').then(
            	function(response) {
                   if (typeof response.data === 'object') {
                       defer.resolve(response.data);
                   } else {
                       defer.reject(response.data);
                   }
               },
               function(error) {
                    defer.reject(error);
                    toastr.error('Error getting todo list', 'Error');
               }
           );

           return defer.promise;
        }

        function addTodo (todo) {
        	var defer = $q.defer();
        	
            $http.post('http://localhost:3000/api/Todos', todo).then(
            	function(response) {
	                defer.resolve(response.data);
                    toastr.success('Successfully added', 'Saved');
               },
               function(error) {
	                defer.reject(error);
                    toastr.error('Error saving todo', 'Error');
               }
           );

           return defer.promise;
        }

        function editTodo (id, todo) {
            var defer = $q.defer();
            $http.put('http://localhost:3000/api/Todos' + '/' + id, todo).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Successfully modified', 'Updated');
               },
               function(error) {
                   defer.reject(error);
                    toastr.error('Error updating todo', 'Error');
               }
           );

           return defer.promise;
        }

        function deleteTodo (id) {
            var defer = $q.defer();
            
            $http.delete('http://localhost:3000/api/Todos' + '/' + id).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Successfully removed', 'Deleted');
               },
               function(error) {
                   defer.reject(error);
                    toastr.error('Error deleting todo', 'Error');
               }
           );

           return defer.promise;
        }         
    }
})();