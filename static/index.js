import WebSocketClient from './ws.js';

const MessageType = {
  Key: 0,
  MouseButtonDown: 1,
  MouseButtonUp: 2,
  MouseMove: 3,
};

function createKeyMessage(key) {
  const message = {
    type: MessageType.Key,
    data: key,
  };
  return JSON.stringify(message);
}

const app = {
  $: {
    root: document.querySelector('#root'),
  },
  init() {
    const wsc = new WebSocketClient();
    const hostname = window.location.hostname;
    const port = window.location.port;
    wsc.connect(`ws://${hostname}:${port}/ws`);

    app.wsc = wsc;

    app.render();
  },
  render() {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    const fragment = document.createDocumentFragment();
    rows.forEach(row => {
      const div = document.createElement('div');
      row.forEach(key => {
        const button = app.createElement('button', key);
        button.onclick = () => app.onKey(key);
        div.appendChild(button);
      });
      fragment.appendChild(div);
    });

    app.$.root.innerHTML = '';
    app.$.root.appendChild(fragment);
  },
  createElement(tagName, textContent) {
    const e = document.createElement(tagName);
    e.textContent = textContent;
    return e;
  },
  onKey(key) {
    const message = createKeyMessage(key);
    app.wsc.send(message);
  },
};

app.init();
