$(document).ready(function() {

  // This file pings background scripts and compares DOM hrefs with
  // ones found on the blacklist and user-preferenced blacklist
  // and modifies the matching elements on the DOM

  // Short links are handled through live-connection where short
  // links are sent to background scripts and the respective DOM
  // element is modified as responses are received
  console.log('RUNNING CONTEXT');
  var sites = [];
  var unfilteredSites = [];

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

  // regex to reduce down to XXXXX.com
  var filterLinks = function(unfilteredLink) {
    var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
    domain = domain.replace(/^(www\.)/,''); // Strip off www.
    domain = domain.replace(/^(\/*)/, ''); // Strip off any // remaining
    domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
    domain = domain.split('.').slice(-2).join('.'); // remove prefixes ie: mail.google.com to google.com
    return domain;
  };

  // populate sites and shortSites with DOM links
  var populateSites = function() {
    // var DOMLinks = $('a[href]');
    var DOMLinks = $('a');
    console.log(DOMLinks);
    var cache = {};

    DOMLinks.each(function(index, element) {
      var href = $(element).attr('href');
      var filtered = filterLinks(href);
      unfilteredSites.push(href);
      if (!cache[filtered]) {

        // if a short link, add original link to shortSites
        if (shorts[filtered]) {
          shortSites.push(href);
        } else {
          sites.push(filtered);
          cache[filtered] = filtered;
        }
      }
    });
  }

  populateSites();

  // sends to background script array of sites in form ['xxx.com']

  // ONLY GETS FIRST RESPONSE, THEN REAL RESPONSE COMES IN ~5 SEC LATER
  console.log(sites, 'SITES DATAS');
  console.log(unfilteredSites, 'UNFILTERED SITES');
  chrome.runtime.sendMessage({data: sites}, function(response) {
    console.log('SENDING MESSAGE');
    console.log(response, 'RESPONSE HERE')
    renderDOM(response, $('a[href]'));
    // return true;
  });

  // compares all links on page with what model returns
  function renderDOM(response, DOMLinks) {
    DOMLinks.each(function(index, element) {
      var href = $(element).attr('href');
      var domain = filterLinks(href);
      // if link is in blacklist, change css
      if (response.data.indexOf(domain) !== -1) {
        chrome.storage.sync.get('theme', function(syncStore) {
          for (var prop in syncStore.theme) {
            // Apply all css in theme to <a href> element
            $(element).css(prop, syncStore.theme[prop]);
          }
        });
      }
    });
    console.log(response.data, 'response data');
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Messenger for Shortened Links
  ///////////////////////////////////////////////////////////////////////////////////////////
  var port = chrome.runtime.connect({ name: 'shorts' });

  // send array of short links
  if (shortSites.length > 0) {
    port.postMessage({ data: shortSites });
  }
  // expect back in piecemeal which we will modify specific elements of DOM with
  port.onMessage.addListener(function(response) {
    console.log('response for shortener', response);
    renderDOM(response, $(`a[href="${response.data}"]`));
  });

});
