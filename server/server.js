const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const app = express();
const googleTrends = require('./googleTrends');

// connect to mongo database named "kidtube"
mongoose.connect('mongodb://localhost/newsgate');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(port);
app.get('/googleTrends', googleTrends.getGoogleTrends);

// export our app for testing and flexibility, required by index.js
module.exports = app;
console.log('Server is listening at port: ' + port);
