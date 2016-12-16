var reference = null;
$(document).ready(function() {
  $('a[href]').mousedown(function(event) {
    if (event.which === 3) {
      reference = $(event.target).attr('href');
      chrome.runtime.sendMessage({text: 'sending element', href: reference}, function(response) {
        console.log(response.text);
      });
    }
  });
})


