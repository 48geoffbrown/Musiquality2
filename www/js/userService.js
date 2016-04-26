/**
 * Created by geoffbrown1 on 2/22/16.
 */
var app = angular.module('userService', []);

app.service('userService', userService);
userService.$inject = ['$localStorage'];

function userService($localStorage) {
  var us = this;
  us.update = update;
  us.user = $localStorage['firebase:session::musiquality'];


  function update() {
    us.user = $localStorage['firebase:session::musiquality'];
  }

}
