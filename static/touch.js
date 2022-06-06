/* Only for simulating mouse movement */
class Touch {
  constructor(element, onMouseMove) {
    this.touch = {
      identifier: 0,
      lastX: 0,
      lastY: 0,
    };

    element.ontouchstart = event => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];
      this.touch = {
        identifier: touch.identifier,
        lastX: touch.screenX,
        lastY: touch.screenY,
      };
    };

    element.ontouchmove = event => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];
      if (touch.identifier === this.touch.identifier) {
        const dx = touch.screenX - this.touch.lastX;
        const dy = touch.screenY - this.touch.lastY;
        onMouseMove(dx, dy);
        this.touch.lastX = touch.screenX;
        this.touch.lastY = touch.screenY;
      }
    };

    element.ontouchcancel = event => { };

    element.ontouchend = event => { };
  }

};

export default Touch;
