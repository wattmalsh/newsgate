// expects two arrays: client and blacklist 
/*
[
  {
    url: String,
    rating: ratingSchema,
    createdAt: ISODate object,
    updatedAt: ISODate object
  }
]
*/

// get sites array from renderBlacklistedDOM
console.log('BACKGROUND FILE RUNNING');

chrome.runtime.onMessage.addListener(
  console.log('BACKGROUND AND CHECK FOR FAKE HAS RECEIVED');
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.data == "sites")
      sendResponse({farewell: "goodbye"});
  }
);
