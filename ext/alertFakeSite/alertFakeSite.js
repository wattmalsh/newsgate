console.log('Running alertFakeSite.js');
function alertFakeSite() {
  $('body').prepend('<div class="fake-site-popup"><p class="fake-site-close">close</p><p class="fake-site-alert">NewsGate has reason to believe this is a fake site.</p></div>');
  $('.fake-site-popup').click(function() {
    $('.fake-site-popup').hide();
  });
}

// Receive the url of the current window from background.html
chrome.runtime.sendMessage({action: 'getUrl'}, function(getUrlResponse) {
  console.log('The current url is: ', getUrlResponse.url);
  chrome.runtime.sendMessage({action: 'checkUrl', url: response.url}, function(checkUrlResponse) {
    if ( checkUrlResponse.fake )
    alertFakeSite();
  });
});
