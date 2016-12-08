# newsgate
Sniffing the news

### Loading Blacklist

Newsgate utilizes the blacklist currated by the creators of https://github.com/bs-detector.  In order to load the blacklist:

1) Ensure that Mongo is running<br>
2) Ensure that you've already run 'npm install'<br>
3) Run 'npm run blacklist'

### Updating the Blacklist

Newsgate includes a script to fetch the latest version of the blacklist from "https://raw.githubusercontent.com/bs-detector/bs-detector/dev/ext/data/data.json".  When the script runs it will:

1) Add all new blacklisted sites (found in the bs-detector file) to the database<br>
2) Update all existing blacklisted sites to ensure proper categorization<br>
3) Overwrite your local copy of blacklist.js with the updated database content<br>

####In order to update the Blacklist:

1) Ensure that Mongo is running<br>
2) Ensure that you've already run 'npm install'<br>
3) Ensure that you've already run 'npm run blacklist'<br>
4) Run 'npm run blacklist:update'

### Blowing away the Database

This will drop the Mongo database.  

1) Ensure that Mongo is running<br>
2) Run 'npm run reset'
