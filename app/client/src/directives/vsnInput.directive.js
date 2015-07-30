/*
    I'm an attribute level directive capable of tranforming the input on the fly.  
    At least for now I do not take any optional attribute.
    Eventually I'll get graduated to an Element directive and will be responsible of setting all the field level relevant error messages.
  
    Usage : 
        <input .....vsn-input ... </input> 
*/
ng.module('truecar.common').directive('vsnInput', 
function vsnInput(vsnValidationService) {

  function vsnInputController(scope, el, attrs, ctrl) {
    // Set max length attribute
    el.attr('maxlength', vsnValidationService.vsnLength);

    /**
     * Prevent bad chars
     */
    function checkChars(val) {
      if (!val) {
        return val;
      }
      var replace = new RegExp(vsnValidationService.replaceRegEx, 'g');
      var newVal = val.substr(0,12).replace(replace, '');
      if (newVal !== val) {
        ctrl.$setViewValue(newVal);
        ctrl.$render();
      }
      return newVal;
    }

    /**
     * Upper case the input
     */
    function upperCase(val) {
      if (val) {
        var upper = val.toUpperCase();
        if (upper !== val) {
          ctrl.$setViewValue(upper);
          ctrl.$render();
        }
        return upper;
      }
      return val;
    }

    /**
     * Check our validity
     */
    function onInput(vsn) {
      // Clear these for now
      ctrl.$setValidity('invalidlength', true);
      ctrl.$setValidity('invalidchars', true);
      // ctrl.$setValidity('invalidcheckdigit', true);
      if (!vsn) {
        return vsn;
      }
      var check = vsnValidationService.validate(vsn);
      if (check.valid) {
        ctrl.$setPristine();
        if (scope.vsnIsValid) {
          scope.vsnIsValid(vsn);
        }
        return vsn;
      }
      //todo: set this error only on onBlur.  Quite annoying seeing the message displayed as I type the vsn
      ctrl.$setValidity(check.errCode, false);
      return vsn;
    }

    ctrl.$parsers.unshift(onInput);
    ctrl.$parsers.unshift(checkChars);
    ctrl.$parsers.unshift(upperCase);
  }

  return {
    scope: {
      'ngModel': '=ngModel',
      'vsnIsValid': '=vsnIsValid'
    },
    restrict: 'A',
    require: 'ngModel',
    link: vsnInputController
  };
});

