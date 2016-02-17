var socket = io.connect(Configuration.host);

socket.on("runnerComplete", function(message) {   
});

socket.emit('startRunner', {});