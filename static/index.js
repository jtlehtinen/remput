import WebSocketClient from './ws.js';

const VK_LBUTTON = 0x01;
const VK_RBUTTON = 0x02;
const VK_MBUTTON = 0x04;

function toKeyCode(key) {
  if (key === 'RMB') return VK_RBUTTON;
  if (key === 'LMB') return VK_LBUTTON;
  if (key === 'MMB') return VK_MBUTTON;

  if (key >= 'A' && key <= 'Z')
    return key.charCodeAt(0);

  switch (key) {
    case '0': return 0x30;
    case '1': return 0x31;
    case '2': return 0x32;
    case '3': return 0x33;
    case '4': return 0x34;
    case '5': return 0x35;
    case '6': return 0x36;
    case '7': return 0x37;
    case '8': return 0x38;
    case '9': return 0x39;
  }

  return 0;
}
const MessageType = {
  KeyDown: 0,
  KeyUp: 1,
  MouseButtonDown: 2,
  MouseButtonUp: 3,
  MouseMove: 4,
};

const app = {
  $: {
    root: document.querySelector('#root'),
  },
  init() {
    const wsc = new WebSocketClient();
    const hostname = window.location.hostname;
    const port = window.location.port;
    wsc.connect(`ws://${hostname}:${port}/ws`);

    app.mouseEnabled = false;
    app.wsc = wsc;

    app.render();
  },
  render() {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    const keysFragment = document.createDocumentFragment();
    rows.forEach(row => {
      const div = document.createElement('div');
      row.forEach(key => {
        const button = app.createElement('button', key);
        button.onclick = () => app.onKey(key);
        div.appendChild(button);
      });
      keysFragment.appendChild(div);
    });

    document.oncontextmenu = event => {
      if (app.mouseEnabled) {
        event.preventDefault();
        return false;
      }
    };

    document.body.onkeydown = event => {
      if (event.code === 'Space') {
        app.mouseEnabled = !app.mouseEnabled;
      }
    };

    document.body.onmousemove = event => {
      if (!app.mouseEnabled) return;

      const dx = event.movementX;
      const dy = event.movementY;
      app.onMouseMove(dx, dy);
    };

    document.body.onmousedown = event => {
      if (!app.mouseEnabled) return;
      if (event.button === 0) app.onMouseButtonDown('LMB');
      if (event.button === 1) app.onMouseButtonDown('MMB');
      if (event.button === 2) app.onMouseButtonDown('RMB');
      event.preventDefault();
    };

    document.body.onmouseup = event => {
      if (!app.mouseEnabled) return;
      if (event.button === 0) app.onMouseButtonUp('LMB');
      if (event.button === 1) app.onMouseButtonUp('MMB');
      if (event.button === 2) app.onMouseButtonUp('RMB');
      event.preventDefault();
    };

    app.$.root.innerHTML = '';
    app.$.root.appendChild(keysFragment);
  },
  createElement(tagName, textContent) {
    const e = document.createElement(tagName);
    e.textContent = textContent;
    return e;
  },
  onKey(key) {
    key = toKeyCode(key);

    app.wsc.send(JSON.stringify(
      {
        type: MessageType.KeyDown,
        message: {key}
      }
    ));

    app.wsc.send(JSON.stringify(
      {
        type: MessageType.KeyUp,
        message: {key}
      }
    ));
  },
  onMouseButtonDown(button) {
    button = toKeyCode(button);
    app.wsc.send(JSON.stringify(
      {
        type: MessageType.MouseButtonDown,
        message: {button}
      }
    ));
  },
  onMouseButtonUp(button) {
    button = toKeyCode(button);
    app.wsc.send(JSON.stringify(
      {
        type: MessageType.MouseButtonUp,
        message: {button}
      }
    ));
  },
  onMouseMove(dx, dy) {
    console.log(`move: ${dx}x${dy}`);
    const scale = 2;
    dx *= scale;
    dy *= scale;

    app.wsc.send(JSON.stringify(
      {
        type: MessageType.MouseMove,
        message: {dx, dy}
      }
    ));
  },
};

app.init();
