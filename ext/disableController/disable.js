// var setAlarm = function(name, ms) {
//   if (chrome.alarms) {
//     chrome.alarms.clearAll(function() {
//       createAlarm(name, ms);
//     })
//   } else {
//     console.log('in creating')
//     createAlarm(name, ms);
//   }
// };

// function alarmListener(alarm) {
//   if (alarm === 'disableAlarm') {
//     console.log(alarm);
//     console.log('inside');
//     chrome.alarms.clear('disableAlarm');
//   }
// }

var setAlarm = function(name, min) {
  // Create alarm and ensure there are no other outstanding alarms
  chrome.alarms.clearAll(function() {
    chrome.alarms.create(name, { delayInMinutes: min });    
  });
}

// Add listener to alarm
chrome.alarms.onAlarm.addListener(function alarmListener(alarm) {
  console.log(alarm, 'alarm props');
  if (alarm.name === 'disableAlarm') {
    console.log('correct alarm');
    setDisabledState(false, function() {
      console.log('Reverted back to enabled');
    });
  }
});  
