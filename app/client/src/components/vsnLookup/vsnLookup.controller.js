//@ngInject
angular.module('truecar')
  .controller('vsnLookupController', ['$scope', 'vsnService', function ($scope, vsnService) {
    
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

    $scope.disabled = function() {
      return $scope.$eval('form.$invalid') || $scope.isBusy === true;
    }

    $scope.submit = function(params) {

      if ($scope.disabled()) return;

      $scope.isBusy = true;
      $scope.$broadcast('show-errors-check-validity');
    
      vsnService.query(params).$promise
      .then(
        function (response) {
          $scope.dataAvailable = $scope.isBusy = $scope.serverErrors = false;
          if (!ng.isUndefined(response) && response.length > 0) {
            $scope.dataAvailable = true;
            $scope.vsnDetails = response[0];  
          } else {
            $scope.serverErrors = true; //!!
            $scope.server.errors = 'not.found';
          }
        },
        queryFailure
      );
    };
    
    $scope.reset = function() {
      $scope.$broadcast('show-errors-reset');
      this.params = { vsn: null};
      $scope.dataAvailable = false;
      $scope.isBusy = false;
      $scope.serverErrors = false;
    }

    querySuccess = function() {
      console.log("resolved to true");
      $scope.isBusy = false;
    };
    queryFailure = function() {
      //todo: refactor - service to return appropriate error response..
      $scope.serverErrors = true; //!!
      $scope.isBusy = false;
    };

  }]);
