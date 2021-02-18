// install express through bash terminal:
// run this command under the wwwroot directory,
// npm install -save express

var express = require('express');
var server = express();
var options = {
index: 'index.html'
};
server.use('/', express.static('/home/site/wwwroot', options));
server.listen(process.env.PORT);