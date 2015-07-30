'use strict';

describe('vsnInput: Directive', function () {

  var vsnService;

  beforeEach(module('truecar'));
  beforeEach(module('truecar.common'));

  beforeEach(inject(function(vsnValidatorService) {
    vsnService = vsnValidatorService;
  }));

	it('should do a basic string compare', function() {
		expect(vsnService).toBeDefined();
        expect(true).toBe(true);
    });

  it('should invalidate empty vsn', function() {
    var result = vsnService.validate('');
    expect(result.valid).toEqual(false);
    expect(result.errCode).toEqual('emptyvsn');
  });

  it('should invalidate short vsn', function() {
    var result = vsnService.validate('abc');
    expect(result.valid).toEqual(false);
    expect(result.errCode).toEqual('invalidlength');
  });

  it('should invalidate if vsn does not start with alphabets', function() {
    var result = vsnService.validate('123456789912');
    expect(result.valid).toEqual(false);
    expect(result.errCode).toEqual('invalidchars');
  });

  it('should invalidate if vsn does not end with numbers', function() {
    var result = vsnService.validate('abcdefhjyuqw');
    expect(result.valid).toEqual(false);
    expect(result.errCode).toEqual('invalidchars');
  });

  it('should validate vsn with correct pattern', function() {
    var result = vsnService.validate('abcdef123456');
    expect(result.valid).toEqual(true);
    expect(result.errCode).not.toBeDefined();
  });

});