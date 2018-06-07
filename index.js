var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/qlab', function (req, res) {
  io.of('fx').emit(req.body.type, req.body.message);
  console.log('broadcasting in fx channel...');
  res.send(JSON.stringify({ status: 'ok' }));
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
