var renderBlacklistedDOM = function() {

}


// chrome.runtime.sendMessage({data: 'sites'}, function(response) {
//   console.log(response, '....RESPONSE ON CONTEXT SCRIPT');
// });
// var links = $('a[href]');
// console.log(links);
// console.log(links.toArray());

var sitesToCompare = $('a[href]');
var sites = [];

sitesToCompare.each(function(index, element) {
  sites.push($(element).attr('href'));
});

chrome.runtime.sendMessage({data: sites}, function(response) {

  // console.log(response.farewell, response.test, '....RESPONSE ON CONTEXT SCRIPT');
  sitesToCompare.each(function(index, element) {
    var href = $(element).attr('href');
    if (response.data.indexOf(href) !== 0) {
      $(element).css('background-color', 'red');
    }
  });
});

  // console.log($(JSON.parse(response.farewell)));
  // console.log($(response.farewell) instanceof jQuery);
  // console.log('JSON STRINGIFIED...', JSON.stringify(response.farewell));
  // console.log('JSON STRINGIFIED JQUERY', JSON.stringify($(response.farewell)));


  // console.log(sites);
  // .each(function(index, element) {
  //   sites.push($(element).attr('href'));
  // });