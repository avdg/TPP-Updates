var express = require('express');
var app = express();

var feed = require('./www/feed.json');

app.disable('x-powered-by');

// Logs
app.use(express.logger({
	"format": ':remote-addr - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
}));

// Feeds

app.get('/feed.json', function(req, res) {
	res.type('json').send(JSON.stringify(feed));
});

// Static content
// express.static is an alias for connect.static
app.use(express.static('www', {
	'maxAge': 30 /*days*/ *24 /*hours*/ *60 /*minutes*/ *60 /*seconds*/ *1000 /*milliseconds*/
}));

// 404
app.use(function(req, res, next){
	res.type('txt').send('404 - Not found');
});

var server = app.listen(8080, function() {
	process.stdout.write('Starting tpp-updates server on port ' + server.address().port + "\n");
});
