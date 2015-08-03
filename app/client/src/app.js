// Declare app level module which depends on filters, and services
/*global angular, ng */
'use strict';
var ng = require('ng'),
app;

window.ng = angular;
ng.module('truecar.common',[]);

angular.module('truecar', [
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.date',
	'truecar.common',
  require('../components/vsnLookup')
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        //todo: use templateCache
        templateUrl: 'src/components/vsnLookup/templates/vsnLookup.ng.html'})
      .otherwise({redirectTo: '/'});
  }])
  .constant('_', window._)