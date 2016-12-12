# newsgate
Sniffing the news

## We created a tool that gives people insights about the news using NLP and social media. Input a URL and get back google trend data, a bubble chart using the Alchemy Language API's keyword extraction and the top tweets for that article. 

## Project Vision
Create a convenient and insightful way for people to make decisions about the validity of news stories. We set out hoping to create an algorithm that would determine the quality of news stories and eliminate fake news. 

## Instructions
### Running the project
1) npm install
2) bower install
3) cd client and then npm install 

### Do the following: 

### Load Blacklist

Newsgate utilizes the blacklist currated by the creators of https://github.com/bs-detector.  In order to load the blacklist:

1) Ensure that Mongo is running<br>
2) Ensure that you've already run 'npm install'<br>
3) Run 'npm run blacklist'

### Update the Blacklist

Newsgate includes a script to fetch the latest version of the blacklist from "https://raw.githubusercontent.com/bs-detector/bs-detector/dev/ext/data/data.json".  When the script runs it will:

1) Add all new blacklisted sites (found in the bs-detector file) to the database<br>
2) Update all existing blacklisted sites to ensure proper categorization<br>
3) Overwrite your local copy of blacklist.js with the updated database content<br>

####In order to update the Blacklist:

1) Ensure that Mongo is running<br>
2) Ensure that you've already run 'npm install'<br>
3) Ensure that you've already run 'npm run blacklist'<br>
4) Run 'npm run blacklist:update'

#### Blowing away the Database

This will drop the Mongo database.  

1) Ensure that Mongo is running<br>
2) Run 'npm run reset'

### Add the chrome extension
1) In chrome://extensions enable developer mode (checkbox in the upper right corner)
2) drag and drop newsgate/ext folder into the extensions window. 
3) the extension should show up in your chrome toolbar

### Google Trends API - REQUIRED

To make numerous requests to the Google Trends website, a cookie needs to be supplied in the headers of the GET request. See instructions below to add a cookie to the 'google-trends-api' library.

1) Ensure that you've already run 'npm install'<br>
2) Go to node_modules/google-trends-api/lib/utils/trendData.js file<br>
3) Overwrite the 'promiseArr' function with the function found in the server/trends/googleTrendsCookie.example.js<br>
4) Change the Cookie string to personal Chrome cookie which can be found at 'chrome://settings/cookies' then search for 'google.com'. This will require copy/pasting 6 different cookie IDs to match the current cookie string format<br>
5) Save node_modules/google-trends-api/lib/utils/trendData.js file

### Twitter Search API - REQUIRED

1) Obtain Twitter API keys and access tokens from Twitter Developer<br>
2) Rename 'server/trends/twitterAPIKey.example.js' file to 'server/trends/twitterAPIKey.js'<br>
3) Overwrite the values with your API keys and access tokens<br>
4) Save twitterAPIKey.js file

### Watson API - REQUIRED

1) Obtain Watson API key from Watson Developer Cloud<br>
2) Rename 'server/watson/watson_api_key_example.js' to 'server/watson/watson_api_key.js'<br>
3) Overwrite the 'watsonKey' value with your API key<br>
4) Save 'watson_api_key.js' file
