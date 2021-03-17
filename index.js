const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname+'/front'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

//user
io.on('connection', (socket) => {
    console.log('a user connected');
});


//message cote server
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  //broadcast cote front
  socket.on('message',(msg)=>{
    console.log('message: '+msg)
    io.emit('new-message',msg)
  });

  //voir docu socket.io
