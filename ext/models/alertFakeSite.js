function alertFakeSite() {
  $('body').prepend('<div class="fake-site-popup"><p class="fake-site-close">close</p><p class="fake-site-alert">NewsGate has reason to believe this is a fake site.</p></div>');
  $('.fake-site-popup').click(function() {
    $('.fake-site-popup').hide();
  });
}

// Recieve the url of the current window from background.html
chrome.runtime.sendMessage({url: true}, function(response) {
  if (response.fake) {
    alertFakeSite();
  }
});
