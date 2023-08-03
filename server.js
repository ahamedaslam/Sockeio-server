const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const PORT = 3000;

// Event names
const CHAT_KEYS = {
  NEW_MESSAGE: 'new_message',
  BROADCAST: 'broadcast',
};

const messages = [
    { id: 1, isSelf: false, text: 'Hello from the server!', username: 'Server' },
    { id: 2, isSelf: false, text: 'How are you doing?', username: 'Server' },
    { id: 3, isSelf: false, text: 'I hope you are enjoying the app!', username: 'Server' }
];

io.on('connection', client => {
    console.log('Connection received');

    client.on('new_message', (chat) => {
        console.log(`New message received: ${chat}`);
        io.emit(CHAT_KEYS.BROADCAST, chat); // Send the chat data to all connected clients
    });

    // Emit different messages to all connected clients every 5 seconds
    let currentIndex = 0;
    setInterval(() => {
        io.emit(CHAT_KEYS.BROADCAST, messages[currentIndex]);
        currentIndex = (currentIndex + 1) % messages.length;
    }, 5000);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
