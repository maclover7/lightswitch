var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

app.listen(3000, function() {
  console.log('Lightswitch is now listening on port 3000...');
});