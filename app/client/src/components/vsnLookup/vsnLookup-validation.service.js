/*  
  visit http://en.wikipedia.org/wiki/Vehicle_identification_number for more information on Vehicle identification number(VIN)
  We are not using all of the validations for VIN, but just forms the basis for this service.
  Check digit is ignored delibrately as it not applicable for this POC.  Probably in Version 2!!.
*/
ng.module('truecar').factory('vsnValidationService', function () {

  var response = {};
  var vsnLength = response.vsnLength = 12;
  var checkDigitIdx = response.checkDigitIndex = 8;
  var invalidChars = response.invalidChars = 'OQI';
  // var regEx = response.regEx = "[A-HJ-NPR-Z0-9]{12}";//VsN no. validation (which does not include the letters I (i), O (o), or Q (q))
  var regEx = response.regEx = "[A-Z]{6}[0-9]{6}"; //Adjust for the data provided by TrueCar as opposed to using the real VsN no validation.
  // var replaceRegEx = response.replaceRegEx = "[^A-HJ-NPR-Z0-9]";
  var replaceRegEx = response.replaceRegEx = "[^A-Z]{6}[^0-9]{6}";
  var characterMap = response.characterMap = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2, 'L': 3, 
                                    'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9 };
  var weights = response.weights = [
    8, 7, 6, 5, 4, 3, 2, 10, // Check digit does not have weight
    null, 9, 8, 7, 6, 5, 4, 3, 2 ];

  function validate(vsn) {

    if (!vsn) {
      return {
        valid: false,
        error: 'VSN cannot be empty',
        errCode: 'emptyvsn'
      };
    }

    if (vsn.length < vsnLength) {
      return {
        valid: false,
        error: 'VSN must be ' + vsnLength + ' characters',
        errCode: 'invalidlength'
      };
    }

    vsn = vsn.toUpperCase();

    if (!(new RegExp(regEx, 'g').test(vsn))) {
      return {
        valid: false,
        error: 'VSN must be alphanumeric and cannot contain ' +
          ' any of the following: ' + invalidChars.split('').join(', '),
        errCode: 'invalidchars'
      };
    }

    // var vsnList = vsn.split('');
    // var sum = 0;
    // var i;

    // for (i = 0; i < vsnLength; ++i) {
    //   if (i === checkDigitIdx) {
    //     continue;
    //   }

    //   if (isNaN(vsnList[i])) {
    //     sum += (characterMap[vsnList[i]] * weights[i]);
    //   } else {
    //     sum += (vsnList[i] * weights[i]);
    //   }
    // }

    // var checkDigit = sum % 11;

    // if (checkDigit === 10) {
    //   checkDigit = "X";
    // }

    // if (checkDigit != vsnList[checkDigitIdx]) {
    //   return {
    //     valid: false,
    //     error: 'VsN is invalid',
    //     errCode: 'invalidcheckdigit'
    //   };
    // }

    return { valid: true };
  }

  response.validate = validate;

  return response;
});