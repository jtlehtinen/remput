
class WebSocketClient {
  constructor(onconnected, ondisconnected) {
    this.connected = false;
    this.onconnected = onconnected;
    this.ondisconnected = ondisconnected;
  }

  connect(url) {
    const ws = new WebSocket(url)
    this.ws = ws;

    ws.onopen = event => {
      this.connected = true;
      this.onconnected();
    };

    ws.onclose = event => {
      this.connected = false;
      this.ws = null;
      this.ondisconnected();
    };

    ws.onmessage = event => {
      console.log('RESPONSE: ' + event.data);
    };

    ws.onerror = event => {
      console.log('ERROR: ' + event.data);
    };
  }

  disconnect() {
    if (!this.connected) return;

    this.ws.close();
  }

  send(message) {
    if (!this.connected) return;

    this.ws.send(JSON.stringify(message));
  }
};

export default WebSocketClient;
