services = angular.module('options.services', []);

services.factory('Blacklist', function() {

});


services.factory('Themes', function() {

});


services.factory('General', function() {
  
  // Disable for x minutes
  var disable = function(min) {
    console.log('Inside General');

    // Set disabled to true
    chrome.extension.getBackgroundPage().setDisabledState(true, () => {
      
      // Use set timeout to set back to false
      setTimeout(() => {
        chrome.extension.getBackgroundPage().setDisabledState(false, () => {
          chrome.extension.getBackgroundPage().console.log('Set state to false');
        }) 
      }, 5000);  
    })

  }

  return {
    disable: disable
  };

});
