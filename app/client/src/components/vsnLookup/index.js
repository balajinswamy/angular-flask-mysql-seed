var 
	ng = require('ng'),
	componentName = 'truecar.vsnLookup',
	component = ng.module(componentName, [
		require('../../shared')
	]);

	component.
		factory('vsnValidationService', require('./vsnLookup-validation.service'))
		.factory('vsnLookupClient', require('./vsnLookup.client'))
		.provider('showErrorsConfig', require('./showErrorsConfig.provider'))
		.directive('showErrors', require('./showErrors.directive'))
		.directive('vsnInput', require('./vsnInput.directive'))
		.controller('vsnLookupController', require('./vsnLookup.Controller'));

	module.exports = componentName;

