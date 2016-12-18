services = angular.module('options.services', []);

services.factory('Blacklist', function() {

});


services.factory('Themes', function() {

});


services.factory('General', function() {
  
  var id = 0;

  // Disable for x minutes
  var disable = function(min) {
    console.log('Inside General');
    // Clear all disabled

    // Set disabled to true
    if (min === 0) {
      chrome.extension.getBackgroundPage().setDisabledState(false, () => {
        console.log('Newsgate enabled');
      });      
    } else {
      chrome.extension.getBackgroundPage().setDisabledState(true, () => {
        
        // Set alarm at background level
        chrome.extension.getBackgroundPage().setAlarm('disableAlarm', min);
      });  
    } 
  }

  return {
    disable: disable
  };

});
