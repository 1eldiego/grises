import http from 'http';
import WebSocket from 'websocket';
const PORT = 5000;
const httpServer = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
httpServer.listen(PORT, () => {
    console.log((new Date()) + ` Server is listening on port ${PORT}`);
});
const wsServer = new WebSocket.server({
    httpServer,
    autoAcceptConnections: false,
});
export { httpServer, wsServer };
