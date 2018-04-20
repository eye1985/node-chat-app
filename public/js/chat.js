var socket = io();


function scrollToBottom(){
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server');

    var params = jQuery.deparam(location.search);
    socket.emit('join', params, function(error){
        if (error){
            alert(error);
            location.href = '/';
        }else{
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconneted from server');
});

socket.on('updateUserList', function(users){
    const ol = $('<ol></ol>');

    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        url : message.url,
        from : message.from,
        createdAt : formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

document.addEventListener("DOMContentLoaded", function(){
    $("#message-form").on('submit', function(event){
        event.preventDefault();

        var messageTextBox = $('[name=message]');

        socket.emit('createMessage', {
            from : 'User',
            text: $('#message-form [name=message]').val()
        }, function(){
            messageTextBox.val('');
        });
    });

    var locationButton = $('#send-location');

    locationButton.click(function(){
        if(!navigator.geolocation){
            return alert("Geolocation not supported by your browser");
        }

        locationButton.attr('disabled', 'disabled').text('Sending location...')

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
        }, function(error){
            locationButton.removeAttr('disabled').text('Send location');
            alert("Unable to fetch location.",);
        });
    });
});