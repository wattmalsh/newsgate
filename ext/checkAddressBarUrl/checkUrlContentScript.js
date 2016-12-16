// THIS FUNCTION MAKES THE INITIAL CALL ON PAGE LOAD
// TO checkUrlBackground.js
chrome.runtime.sendMessage({action: 'getUrl'}, function(getUrlResponse) {
  console.log('The current url is: ', getUrlResponse.url);

  // Do not make calls to view functions if in disabled state
  if (getUrlResponse.disabled) {
    return;
  }

  // Make a second call once the address url bar is determined whether to render the alert banner
  // or render the hrefs in the DOM (both functions are in ext/views
  chrome.runtime.sendMessage({action: 'checkUrl', url: getUrlResponse.url}, function(checkUrlResponse) {
    console.log('Response from checkUrl came back.', checkUrlResponse);
    if ( checkUrlResponse.fake ) {
      console.log('This is a fake site: ', checkUrlResponse.url);
      console.log('This is the type: ', checkUrlResponse.urlObj.rating.type);
      alertFakeSite(checkUrlResponse.urlObj.rating.type);
    } else {
      renderDom();
    }
  });
});
