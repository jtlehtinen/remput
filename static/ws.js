
class WebSocketClient {
  constructor() {
    this.connected = false;
  }

  connect(url) {
    console.log('connect()');
    const ws = new WebSocket(url)
    this.ws = ws;

    ws.onopen = event => {
      console.log('onopen');
      this.connected = true;
    };

    ws.onclose = event => {
      console.log('onclose');
      this.connected = false;
      this.ws = null;
    };

    ws.onmessage = event => {
      console.log('onmessage');
      console.log('RESPONSE: ' + event.data);
    };

    ws.onerror = event => {
      console.log('onerror');
      console.log('ERROR: ' + event.data);
    };
  }

  disconnect() {
    if (!this.connected) return;

    this.ws.close();
  }

  send(message) {
    if (!this.connected) return;

    this.ws.send(message);
  }
};

export default WebSocketClient;
