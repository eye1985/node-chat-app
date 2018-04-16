var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconneted from server');
});

socket.on('newMessage', function(message){
    var li = $('<li></li>');
    li.text(`${message.from} ${message.text}`);

    $('#messages').append(li);
});

document.addEventListener("DOMContentLoaded", function(){
    $("#message-form").on('submit', function(event){
        event.preventDefault();

        socket.emit('createMessage', {
            from : 'User',
            text: $('#message-form [name=message]').val()
        }, function(){});
    });
});