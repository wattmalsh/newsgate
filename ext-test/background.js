function checkForFakes() {
  $('a[href]').each(function(index, element) {
    
    // gets the href value of each element
    $(element).attr('href')

    
    // check db for a match


    // if match in blacklist then turn element red
  });
}

checkForFakes();

