export default class Event {
  constructor() {
    this.handles = {};
  }
  addEvent(eventName, fn) {
    if (typeof this.handles[eventName] === "undefined") {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(fn);
  }
  trigger(eventName, val) {
    this.handles[eventName].forEach((v) => v(val));
  }
  removeEvent(eventName, fn) {
    if (!(eventName in this.handles)) {
      return;
    }
    for (let i = 0; i < this.handles[eventName].length; i++) {
      if (this.handles[eventName][i] === fn) {
        this.handles[eventName].splice(i, 1);
        i--;
        break;
      }
    }
  }
}