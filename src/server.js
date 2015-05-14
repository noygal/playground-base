var path = require('path');

var express = require('express');
var app = express();

var redis = require('./db/redis');
var Logic = require('./logic/logic').Logic;
var logic = new Logic();

var connector = new redis.RedisConnector('130.211.127.158', 6379);


app.get('/api', function (req, res) {
  connector.getRoutes().then((data) => {
    console.log('data');
    console.log(data);
    var result = logic.findZeroRouteSolution(data);
    console.log('result');
    console.log(result);
    res.send([{success : result.map((elemet)=> {return elemet.uid;})}]);
  })
  .catch((err)=>{
    console.log('err');  
    res.send(err).status(400);  
  });
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});