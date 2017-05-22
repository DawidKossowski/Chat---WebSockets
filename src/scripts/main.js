/**
 * Created by Dawid on 03.05.2017.
 */
(function($) {
    var socket = io.connect();
    var $nickForm = $('#setNick');
    var $nickError = $('#nickError');
    var $nickBox = $('#nickName');
    var $users = $('#users')
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    $nickForm.submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $nickBox.val(), function(data) {
            if(data) {
                $('.nickWrapper').hide();
                $('.contentWrapper').show();
            } else {
                $nickError.html('That username is already taken! Try again.');
            }
        });
        $nickBox.val('');
    })

    socket.on('usernames', function(data) {
        $users.html('');
        for(i = 0; i < data.length; i++) {
            $users.append('<li>' + data[i] + '</li>');
        }
    })

    socket.on('join user', function(data) {
        var joinedMsg = '<p><i>' + data + ' has been joined!</i></p>';
        socket.emit('send message', joinedMsg);
    })

    $messageForm.submit(function(e) {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');
    });

    socket.on('new message', function(data) {
        $chat.append("<p><b>" + data.nick + ": </b>" + data.msg + "</p>");
    });
})(jQuery);