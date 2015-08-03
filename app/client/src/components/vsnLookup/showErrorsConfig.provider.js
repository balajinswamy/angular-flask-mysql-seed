//@ngInject
// ng.module('truecar.common').provider('showErrorsConfig', 
	function showErrorsConfig() {
	  var _showSuccess;
	  _showSuccess = false;
	  this.showSuccess = function (showSuccess) {
	    return _showSuccess = showSuccess;
	  };
	  this.$get = function () {
	    return { showSuccess: _showSuccess };
	  };
	}
);

module.exports = showErrorsConfig;