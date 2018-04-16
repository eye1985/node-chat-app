const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat app"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

    socket.on('disconnect', () => {
        console.log('Client disconnect');
    });

    socket.on('createMessage', message => {
       console.log(message);

       io.emit("newMessage", generateMessage(message.from, message.text));

        // socket.broadcast.emit("newMessage",{
        //     from : message.from,
        //     text: message.text,
        //     createdAt : new Date().getTime()
        // });
    });
});

server.listen(PORT, () => {
    console.log('App started at port ', PORT);
});