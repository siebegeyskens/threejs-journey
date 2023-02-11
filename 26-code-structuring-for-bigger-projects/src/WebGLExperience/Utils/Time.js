import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.last = this.start; // the current timestamp and will change on each frame
    this.elapsed = 0; // time since start of experience
    this.delta = 16; // time since the previous frame

    // wait one frame and then start the nextFrame function
    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }

  nextFrame() {
    const currentTime = Date.now();
    this.delta = currentTime - this.last;
    this.last = currentTime;
    this.elapsed = currentTime - this.start;

    this.trigger("nextFrame"); // send emitter

    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }
}
