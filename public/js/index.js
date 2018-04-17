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

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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

    var locationButton = $('#send-location');

    locationButton.click(function(){
        if(!navigator.geolocation){
            return alert("Geolocation not supported by your browser");
        }

        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
        }, function(error){
            alert("Unable to fetch location.",);
        });
    });
});