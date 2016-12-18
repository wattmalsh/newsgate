services = angular.module('options.services', []);

services.factory('Blacklist', function() {

});


services.factory('Themes', function() {

});


services.factory('General', function() {
  
  // Disable for x minutes
  var disable = function(min) {

    // Set disabled to true
    if (min === 0) {
      chrome.extension.getBackgroundPage().setDisabledState(false, () => {
        chrome.extension.getBackgroundPage().chrome.alarms.clearAll();
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
