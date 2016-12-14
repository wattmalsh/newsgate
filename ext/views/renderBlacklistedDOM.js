// gets href's on the page and sends them to checkForFakes
function checkForFakes() {
  $('a[href]').each(function(index, element) {
    
    // gets the href value of each element
    // $(element).attr('href')
    $(element).css('background-color', 'red');
    
    // check db for a match


    // if match in blacklist then turn element red
  });
}

checkForFakes();

