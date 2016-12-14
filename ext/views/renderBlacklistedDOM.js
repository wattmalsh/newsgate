var renderBlacklistedDOM = function() {

}

var DOMLinks = $('a[href]');
var sites = [];

var filterLinks = function(unfilteredLink) {
  var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
  domain = domain.replace(/^www\./,''); // Strip off www.
  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)  
  return domain;
};

DOMLinks.each(function(index, element) {
  var href = $(element).attr('href');
  sites.push(filterLinks(href));
});

chrome.runtime.sendMessage({data: sites}, function(response) {

  // loop through DOM links to compare with blacklist returned by ctrlr
  DOMLinks.each(function(index, element) {
    var href = $(element).attr('href');
    var domain = filterLinks(href);
    console.log('domain');
    // if link is in blacklist, change css
    if (response.data.indexOf(domain) !== -1) {
      $(element).css('background-color', 'red');
    }
  });
});