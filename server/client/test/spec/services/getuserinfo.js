'use strict';

describe('Service: getUserInfo', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var getUserInfo;
  beforeEach(inject(function (_getUserInfo_) {
    getUserInfo = _getUserInfo_;
  }));

  it('should do something', function () {
    expect(!!getUserInfo).toBe(true);
  });

});
