'use strict';

describe('Controller: RadarCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var RadarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RadarCtrl = $controller('RadarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RadarCtrl.awesomeThings.length).toBe(3);
  });
});
