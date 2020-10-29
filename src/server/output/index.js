import connectionHandler from './networking/ClientList.js';
connectionHandler((client) => {
    console.log('Hello', client.id);
    client.onMessage((message) => console.log('Message to', client.id));
});
