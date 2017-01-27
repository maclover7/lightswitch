var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var users = [];

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('alert', function(msg) {
    console.log('broadcasting alert...');
    io.emit('alert', msg);
  });

  socket.on('join', function(msg) {
    console.log('broadcasting users...');
    socket.user = msg.user;
    users.push(msg.user);
    io.emit('users', users);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');

    var index = users.indexOf(socket.user);
    if (index > -1) {
      users.splice(index, 1);
    }

    socket.broadcast.emit('users', users);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
