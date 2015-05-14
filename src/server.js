var m1 = require('./module/module');
var m2 = require('./public/module/module');

let a = new m1.A();
let b = new m2.B();

var path = require('path');

var express = require('express');
var app = express();

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});