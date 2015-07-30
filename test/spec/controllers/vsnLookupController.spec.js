'use strict';

describe("Controller: vsnLookupController", function() {
  
  // load the controller's module we're testing
  beforeEach(module('truecar'));
  beforeEach(module('truecar.common'));

  /* declare our mocks out here so we can use them through the scope 
   * of this describe block.
   */
  var vsnLookupController,
    scope;

  /* Initialize the controller and a mock scope
   * This function will be called before every "it" block.
   */
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    vsnLookupController = $controller('vsnLookupController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  //Do we have the controller defined?
  it('should have been defined', inject(function ($controller) {
    expect(vsnLookupController).toBeDefined();
  }));
  
  //Did scope got injected correctly withing the correct namespace?
  it('should attach dataAvailable to the scope', inject(function ($controller) {
    expect(scope.dataAvailable).toEqual(false);
  }));

  //Now let's test function call
  it('reset function should reset the scope variable vsn', function () {
    //make the function call.
    scope.params.vsn = 'ABCDEF123456';
    expect(scope.params.vsn).not.toBe(null);
    //Now invoke reset function
    scope.reset();

    expect(scope.params.vsn).toBe(null);
  });

  xit('save function should fail is no data is entered', function () {
    //make the function call.
    scope.params.vsn = 'ABCDEF123456';
    scope.submit();

    expect(scope.isBusy).toEqual(true);
    // todo: inject the mock dependency in the before each and assert them here
    
  });


});