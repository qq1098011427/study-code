let obj1 = {
  fn() {
    console.log("我做了fn1");
  },
};
let obj2 = {
  fn() {
    console.log("我做了fn2");
  },
};
class Event {
  constructor() {
    this.handles = {};
  }
  addEvent(eventName, fn) {
    if (typeof this.handles[eventName] === "undefined") {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(fn);
  }
  trigger(eventName) {
    this.handles[eventName].forEach((v) => v());
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
let event = new Event();
event.addEvent("myEvent", obj1.fn);
event.addEvent("myEvent", obj2.fn);
event.trigger("myEvent");
event.removeEvent("myEvent", obj1.fn);
console.log(event);
