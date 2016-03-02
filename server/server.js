var express = require('express');
var db = require('./db');
var session = require('express-session');
var parser = require('body-parser');

var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 8080);
app.set('view engine', 'html');

app.use(session({secret: 'latte'}));
app.use(parser.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static('/app/client' ) );
app.use(express.static('/app/lib'));
app.use('/', router);
// app.use(express.static('/app/client' ) );
// app.use(express.static('/app/lib'));
// app.use(express.static('/client'));
// app.use('/', router);


app.listen(8080, function () {
  console.log('group sched listening on port 8080!');
});
