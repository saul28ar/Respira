// Se mide tiempo transcurrido, no llamadas del intervalo: resiste pestañas en segundo plano.
export class ExerciseClock {
  constructor({ duration = Infinity, onTick = () => {}, onComplete = () => {} } = {}) {
    this.duration = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.elapsed = 0;
    this.startedAt = null;
    this.interval = null;
  }
  get running() { return this.startedAt !== null; }
  get seconds() {
    return Math.min(this.duration, this.elapsed + (this.running ? (Date.now() - this.startedAt) / 1000 : 0));
  }
  start() {
    if (this.running || this.seconds >= this.duration) return;
    this.startedAt = Date.now();
    this.interval = setInterval(() => this.tick(), 200);
    this.tick();
  }
  tick() {
    if (this.seconds >= this.duration) {
      this.pause();
      this.elapsed = this.duration;
      this.onTick(this.seconds, false);
      this.onComplete();
    } else this.onTick(this.seconds, this.running);
  }
  pause() {
    this.elapsed = this.seconds;
    this.startedAt = null;
    clearInterval(this.interval);
    this.interval = null;
    this.onTick(this.seconds, false);
  }
  reset() {
    this.pause();
    this.elapsed = 0;
    this.onTick(0, false);
  }
  dispose() {
    clearInterval(this.interval);
    this.interval = null;
    this.startedAt = null;
  }
}
