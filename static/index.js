import WebSocketClient from './ws.js';
import Touch from './touch.js';
import { toKeyCode, toButtonCode, INVALID_KEY_CODE } from './keys.js';

const MessageType = {
  Key: 0,
  MouseButtonDown: 1,
  MouseButtonUp: 2,
  MouseMove:3,
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
    const wsc = new WebSocketClient(app.render, app.render);
    const hostname = window.location.hostname;
    const port = window.location.port;
    wsc.connect(`ws://${hostname}:${port}/ws`);

    app.mouseEnabled = false;
    app.keyboardEnabled = false;
    app.wsc = wsc;
    app.touch = new Touch(document.body, app.onMouseMove);

    app.$.buttonTouchpad.onclick = () => {
      app.mouseEnabled = !app.mouseEnabled;
      app.$.buttonTouchpad.classList.toggle('active');
    };

    app.$.buttonKeyboard.onclick = () => {
      app.keyboardEnabled = !app.keyboardEnabled;
      app.$.buttonKeyboard.classList.toggle('active');

      const display = app.keyboardEnabled ? 'block' : 'none';
      app.$.keyboard.style.display = display;
    };

    function handleShift() {
      const layoutName = (app.keyboard.options.layoutName === 'default') ? 'shift' : 'default';
      app.keyboard.setOptions({layoutName});
    }

    const Keyboard = window.SimpleKeyboard.default;
    app.keyboard = new Keyboard({
      onKeyPress: key => {
        if (key === "{shift}" || key === "{lock}") {
          handleShift();
        } else if (key === ".com") {
          app.onKey('.');
          app.onKey('c');
          app.onKey('o');
          app.onKey('m');
        } else {
          app.onKey(key);
        }
      }
    });

    document.oncontextmenu = event => {
      if (app.mouseEnabled) {
        event.preventDefault();
        return false;
      }
    };

    document.body.onmousemove = event => {
      //app.onMouseMove(event.movementX, event.movementY);
    };

    document.body.onmousedown = event => {
      console.log(event.button);
      app.onMouseButtonDown(event.button);
      event.preventDefault();
    };

    document.body.onmouseup = event => {
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
  onKey(key) {
    console.log(key);
    key = toKeyCode(key);
    if (!app.keyboardEnabled || key === INVALID_KEY_CODE) return;

    app.wsc.send({type: MessageType.Key, message: {key}});
  },
  onMouseButtonDown(button) {
    button = toButtonCode(button);
    if (!app.mouseEnabled || button === INVALID_KEY_CODE) return;

    app.wsc.send({type: MessageType.MouseButtonDown, message: {button}});
  },
  onMouseButtonUp(button) {
    button = toButtonCode(button);
    if (!app.mouseEnabled || button === INVALID_KEY_CODE) return;

    app.wsc.send({type: MessageType.MouseButtonUp, message: {button}});
  },
  onMouseMove(dx, dy) {
    if (!app.mouseEnabled) return;

    const scale = 4;
    const message = {dx: dx * scale, dy: dy * scale};
    app.wsc.send({type: MessageType.MouseMove, message});
  },
};

app.init();
