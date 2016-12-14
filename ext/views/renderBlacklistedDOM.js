// TO DO: improve regex function does not filter
// to mail.google.com v. blacklist

var sites = [];
// var unfilteredSites = [];

// regex to reduce down to XXX.google.com 
var filterLinks = function(unfilteredLink) {
  var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
  domain = domain.replace(/^(www\.)/,''); // Strip off www.
  domain = domain.replace(/^(\/*)/, ''); // Strip off any // remaining
  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
  domain = domain.split('.').slice(-2).join('.'); // remove prefixes ie: mail.google.com to google.com
  return domain;
};

var renderBlacklistedDOM = function() {
  var DOMLinks = $('a[href]');
  var cache = {};

  DOMLinks.each(function(index, element) {
    var href = $(element).attr('href');
    var filtered = filterLinks(href);

    if (!cache[filtered]) {
      sites.push(filtered);
      cache[filtered] = filtered; // ensure no duplicates
    }
    // unfilteredSites.push(href);
    console.log(sites, '.........sites here ');
    // console.log(unfilteredSites, 'unfilteredSitesHere');
  });
}

renderBlacklistedDOM();

chrome.runtime.sendMessage({data: sites}, function(response) {

  // loop through DOM links to compare with blacklist returned by ctrlr
  var DOMLinks = $('a[href]');
  DOMLinks.each(function(index, element) {
    var href = $(element).attr('href');
    var domain = filterLinks(href);
    console.log(domain)
    console.log(response.data, '.......RESPONSE DATA'); 
    // if link is in blacklist, change css
    if (response.data.indexOf(domain) !== -1) {
      console.log('domain...', domain);
      console.log('INDEX...', response.data.indexOf(domain))
      $(element).css('background-color', '');
      $(element).css('background-color', 'red');
    }
  });
});