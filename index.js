var express = require("express");
var app = express(), http = require('http'), server = http.createServer(app), io = require('socket.io').listen(server);
var sockets = io;
var port=Number(process.env.PORT || 3000);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
      res.render("page");
});
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome to the chat' });
  socket.on('send', function (data) {
    io.sockets.emit('message', data);
  });
});

console.log("Listening on port " + port);
