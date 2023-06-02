class Fps {
  constructor({ canvasWidth }) {
    this.times = [];
    this.fps = 0;
    this.lastUpdate = 0;
    this.lastUpdateCounter = 0;
    this.items = [];
    this.lineWidth = 5;
    this.maxItems = 20;
    this.height = 50;
    this.width = this.maxItems * this.lineWidth;
    this.position = {
      x: canvasWidth - this.width - 20,
      y: 20
    }
    this.div = `
      <style>
        .fps {
          width: 100px;
          height: 50px;
          border-radius: 8px;
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(46, 58, 65, 0.82);
          color: #ACCDDF;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px;
          box-sizing: border-box;
        }
      </style>
      <div class="fps">
        <div class="fps__count">FPS: <span class="js-counter">0</span></div>
      </div>
    `;
    document.querySelector('#fps').innerHTML = this.div;
    this.dom = {
      counter: document.querySelector(".js-counter")
    };
  }

  draw({ c }) {
    this.dom.counter.innerHTML = this.fps;
  }

  update({ c }) {

    const now = performance.now();

    while (this.times.length > 0 && this.times[0] <= now - 1000) {
      this.times.shift();
    }

    const delta = (now - this.times[this.times.length - 1]) / 1000 || 0;
    if (!this.lastUpdate || (this.lastUpdateCounter - this.lastUpdate) >= 0.5) {
      this.lastUpdate = now;
      this.lastUpdateCounter = now;

      this.fps = this.times.length;
      if (this.items.length > this.maxItems) {
        this.items.shift();
      }
      this.items.push(this.fps);

      this.draw({ c });
    }
    this.lastUpdateCounter += delta;

    this.times.push(now);
  }
}

export default Fps;