import { nanoid } from 'nanoid';
import { wsServer } from './Server.js';

const connectionHandler = (onConnect: any) => {
  wsServer.on('request', (request) => {
    const connection = request.accept('game', request.origin);

    const client = {
      id: nanoid(4),
      message: (binaryData: any) => connection.sendBytes(binaryData),
      onMessage: (callback: any) => {
        connection.on('message', (message) => {
          callback(message.binaryData);
        });
      },
      close: () => connection.close(),
      onClose: (callback: any) => {
        connection.on('close', (reasonCode, description) => {
          callback(reasonCode, description);
        });
      },
    };

    onConnect(client);
  });
};

// wsServer.on('connect', (connection) => { console.log('connect'); });
// wsServer.on('close', (connection, reason, description) => { console.log('close'); });

export default connectionHandler;
