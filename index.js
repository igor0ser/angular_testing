var express = require('express');
var app = express();

app.use(express.static('src'));

var server = app.listen(( process.env.PORT || 3000 ), () => {
	var port = server.address().port;
	console.log('Example app listening at http://localhost', port);
});