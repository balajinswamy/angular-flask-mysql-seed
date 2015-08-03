//@ngInject
// angular.module('truecar')
//   .controller('vsnLookupController', ['$scope', 'vsnService', function ($scope, vsnService) {

function vsnLookupController($scope, vsnService) {
    var
      querySuccess,
      queryFailure;
    $scope.isBusy = false;
    $scope.params = {
      vsn : null
    };
    $scope.server = {
      errors: []
    }
    $scope.serverErrors = false;
    $scope.dataAvailable = false;

    init = function() {
      $scope.reset();
    }

    $scope.disabled = function() {
      return $scope.$eval('form.$invalid') || $scope.isBusy === true;
    }

    /*
      bound to the submit button
    */
    $scope.submit = function(params) {

      if ($scope.disabled()) return;

      $scope.isBusy = true;
      $scope.$broadcast('show-errors-check-validity');
    
      vsnService.query(params).$promise
      .then(
        querySuccess,
        queryFailure
      );
    };
    
    /*
      bound to the submit button
    */
    $scope.reset = function() {
      $scope.$broadcast('show-errors-reset');
      this.params = { vsn: null};
      $scope.dataAvailable = false;
      $scope.isBusy = false;
      $scope.serverErrors = false;
    }

    querySuccess = function(response) {
      $scope.dataAvailable = $scope.isBusy = $scope.serverErrors = false;
      if (!ng.isUndefined(response) && response.length > 0) {
        $scope.dataAvailable = true;
        $scope.vsnDetails = response[0];  
      } else {
        $scope.serverErrors = true; //!!
        $scope.server.errors = 'not.found';
      }
    };
    queryFailure = function() {
      //todo: refactor - service to return appropriate error response..
      $scope.serverErrors = true; //!!
      $scope.isBusy = false;
    };

    init();
  };
  module.exports = vsnLookupController;