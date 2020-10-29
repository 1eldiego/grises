import connectionHandler from './networking/ClientList.js';

connectionHandler((client: any) => {
  console.log('Hello', client.id);
  client.onMessage((message: any) => console.log('Message to', client.id));
});