const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const app = express();
const googleTrends = require('./trends/googleTrends');
const watson = require('./watson/watson')
const twitterSearch = require('./trends/twitterTrends');

var dbURI = 'mongodb://localhost/newsgate'
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});


// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(port);
app.get('/googleTrends', googleTrends.getGoogleTrends);
app.get('/watsonTitle', watson.watsonTitle);
app.get('/twitter', twitterSearch.getTweetsOnTopic);

// export our app for testing and flexibility, required by index.js
module.exports = app;
console.log('Server is listening at port: ' + port);
