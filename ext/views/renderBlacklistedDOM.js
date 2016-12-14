var checkForFakes = function() {
  var sites = [];

  // gets the href value of each element
  $('a[href]').each(function(index, element) {
    sites.push($(element).attr('href'));
  });
    
  // send checkForFakes
  chrome.runtime.sendMessage({data: 'sites'}, function(response) {
    console.log(response, '....RESPONSE ON CONTEXT SCRIPT');
  });

  // if match in blacklist then turn element red
  // $(element).css('background-color', 'red');
}

checkForFakes();

