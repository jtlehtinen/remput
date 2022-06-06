import WebSocketClient from './ws.js';
import Touch from './touch.js';

const INVALID_KEY_CODE = -1;

const VK_LBUTTON = 0x01;
const VK_RBUTTON = 0x02;
const VK_MBUTTON = 0x04;

function toKeyCode(key) {
  if (key === 0) return VK_LBUTTON;
  if (key === 1) return VK_MBUTTON;
  if (key === 2) return VK_RBUTTON;

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

  return INVALID_KEY_CODE;
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
    keyboard: document.querySelector('#keyboard'),
    status: document.querySelector('#status'),
    buttonTouchpad: document.querySelector('#button-touchpad'),
    buttonKeyboard: document.querySelector('#button-keyboard'),
  },
  init() {
    app.$.buttonTouchpad.onclick = () => {
      app.$.buttonTouchpad.classList.toggle('active');
    };

    app.$.buttonKeyboard.onclick = () => {
      app.$.buttonKeyboard.classList.toggle('active');
    };

    const wsc = new WebSocketClient(app.render, app.render);
    const hostname = window.location.hostname;
    const port = window.location.port;
    wsc.connect(`ws://${hostname}:${port}/ws`);

    function handleShift() {
      const layoutName = (keyboard.options.layoutName === 'default') ? 'shift' : 'default';
      keyboard.setOptions({layoutName});
    }

    const Keyboard = window.SimpleKeyboard.default;
    const keyboard = new Keyboard({
      onChange: input => console.log(input),
      onKeyPress: button => {
        console.log(button);
        if (button === "{shift}" || button === "{lock}") handleShift();
      }
    });

    app.mouseEnabled = false;
    app.wsc = wsc;

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
      app.onMouseMove(event.movementX, event.movementY);
    };

    document.body.onmousedown = event => {
      if (!app.mouseEnabled) return;
      app.onMouseButtonDown(event.button);
      event.preventDefault();
    };

    document.body.onmouseup = event => {
      if (!app.mouseEnabled) return;
      app.onMouseButtonUp(event.button);
      event.preventDefault();
    };

    app.render();
  },
  render() {
    const connected = app.wsc.connected;
    app.$.status.classList.remove('connected');
    app.$.status.classList.remove('disconnected');
    app.$.status.classList.add(connected ? 'connected' : 'disconnected');
  },
  createElement(tagName, textContent) {
    const e = document.createElement(tagName);
    e.textContent = textContent;
    return e;
  },
  onKey(key) {
    key = toKeyCode(key);
    if (key === INVALID_KEY_CODE) return;

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
    if (button === INVALID_KEY_CODE) return;

    app.wsc.send(JSON.stringify(
      {
        type: MessageType.MouseButtonDown,
        message: {button}
      }
    ));
  },
  onMouseButtonUp(button) {
    button = toKeyCode(button);
    if (button === INVALID_KEY_CODE) return;

    app.wsc.send(JSON.stringify(
      {
        type: MessageType.MouseButtonUp,
        message: {button}
      }
    ));
  },
  onMouseMove(dx, dy) {
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
