var setAlarm = function(name, min) {
  // Create alarm and ensure there are no other outstanding alarms
  chrome.alarms.clearAll(function() {
    chrome.alarms.create(name, { delayInMinutes: min });
  });
}

// Add listener to alarm
chrome.alarms.onAlarm.addListener(function alarmListener(alarm) {
  if (alarm.name === 'disableAlarm') {
    setDisabledState(false, function() {
    });
  }
});
