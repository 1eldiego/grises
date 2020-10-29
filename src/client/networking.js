const buffer = new ArrayBuffer(5);
const view = new DataView(buffer);

view.setUint8(0, 1);
view.setUint8(1, 2);
view.setUint8(2, 3);
view.setUint8(3, 4);
view.setUint8(4, 5);

const ws = new WebSocket('ws://192.168.86.55:5000/', 'game');
ws.binaryType = "arraybuffer";

ws.onopen = (event) => {
  console.log('onopen');
  ws.send(buffer);
  ws.send(buffer);
  ws.send(buffer);
};

ws.onmessage = (event) => {
  console.log('onmessage: ', event.data);
};

export default ws;
