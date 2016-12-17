////////////////////////////////////////////////////////////////////////////////
// CONTENT SCRIPT
// Listens for messages from the background script for whether the site loaded
// is a fake site or not. Create an alert banner or render the dom depending.
////////////////////////////////////////////////////////////////////////////////

chrome.runtime.onMessage.addListener(function(message) {
  if ( message.fake ) {
    alertFakeSite(message.urlObj.rating.type);
  } else {
    renderDom();
  }
});
