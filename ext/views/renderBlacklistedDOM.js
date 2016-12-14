// This file pings background scripts and compares DOM hrefs with
// ones found on the blacklist and user-preferenced blacklist 
// and modifies the matching elements on the DOM 

var sites = [];
var shortSites = [];
var shorts = {
  'bit.do': 'bit.do',
  'bit.ly': 'bit.ly',
  'cutt.us': 'cutt.us',
  'goo.gl': 'goo.gl',
  'ht.ly': 'ht.ly',
  'is.gd': 'is.gd',
  'ow.ly': 'ow.ly',
  'po.st': 'po.st',
  'tinyurl.com': 'tinyurl.com',
  'tr.im': 'tr.im',
  'trib.al': 'trib.al',
  'u.to': 'u.to',
  'v.gd': 'v.gd',
  'x.co': 'x.co'
};
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

var populateSites = function() {
  var DOMLinks = $('a[href]');
  var cache = {};

  DOMLinks.each(function(index, element) {
    var href = $(element).attr('href');
    var filtered = filterLinks(href);

    if (!cache[filtered]) {
      
      // if a short link, add original link to shortSites
      if (!!shorts[filtered]) {
        shortSites.push(href);
      } else {
        sites.push(filtered);
      }

      // add to cache to ensure no duplicates
      cache[filtered] = filtered;
    }
    // console.log(sites, '.........sites here ');
    // unfilteredSites.push(href);
    // console.log(unfilteredSites, 'unfilteredSitesHere');
  });
}

populateSites();

chrome.runtime.sendMessage({data: sites}, function(response) {
  renderDOM(response, $('a[href]'));
});

// Compares all links on page with what model returns
function renderDOM(response, DOMLinks) {
  // var DOMLinks = $('a[href]');
  DOMLinks.each(function(index, element) {
    var href = $(element).attr('href');
    var domain = filterLinks(href);

    // console.log(domain)
    // console.log(response.data, '.......RESPONSE DATA'); 
    
    // if link is in blacklist, change css
    if (response.data.indexOf(domain) !== -1) {
      // console.log('domain...', domain);
      // console.log('INDEX...', response.data.indexOf(domain))
      $(element).css('background-color', '');
      $(element).css('background-color', 'red');
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////
// Messenger for Shortened Links
///////////////////////////////////////////////////////////////////////////////////////////
// NOT TESTED
var port = chrome.runtime.connect({ name: 'shorts' });

// send array of short links
port.postMessage({ data: shortSites });

// expect back in piecemeal which we will modify specific elements of DOM with
port.onMessage.addListener(function(response) {
  // console.log(response.data);
  renderDOM(response, $(`a[href="${response.data}"]`));
});
