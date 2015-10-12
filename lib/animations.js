(function () {
  Anim = function () {};

  Anim.speed = {
    longRandom: 1.0 + Math.random(),
    slowest: 1.0,
    slower: 0.8,
    slow: 0.6,
    normal: 0.5,
    fast: 0.25,
    faster: 0.125,
    fastest: 0.03725,
    now: 0,
  };

  var tM = TweenMax;
  tM.lagSmoothing(200, 16);

  Anim.prototype.set = function ($el, className) {
    $el.not('.' + className).addClass(className);
  };

  Anim.prototype.remove = function ($el, className) {
    $el.filter('.' + className).removeClass(className);
  };

  Anim.prototype.to = function ($el, speed, className, callback) {
    tM.to(
      $el.not('.' + className),
      Anim.speed[speed],
      {
        css: { className: "+=" + className },
        onComplete: callback
      }
    );
  };

  Anim.prototype.from = function ($el, speed, className, callback) {
    tM.to(
      $el,
      Anim.speed[speed],
      {
        css: { className: "-=" + className },
        onComplete: callback
      }
    );
  };

  Anim.prototype.close = function ($el, speed) {
    // this.fromTo($el, speed, "open", "closing", this.setToClosed.bind(this, $el));
    this.to($el, speed, "closed", this.setToClosed.bind(this, $el));
  };

  Anim.prototype.setToClosed = function ($el) {
    // this.set($el, "closed");
    $el.prop("data-state", "closed");
  };

  Anim.prototype.open = function ($el, speed) {
    // this.fromTo($el, speed, "closed", "opening", this.setToOpen.bind(this, $el));
    this.from($el, speed, "closed", this.setToOpen.bind(this, $el));
  };

  Anim.prototype.setToOpen = function ($el) {
    // debugger
    // this.remove($el, "closed");
    $el.prop("data-state", "open");
  };

  Anim.prototype.over = function ($el, speed) {
    this.to($el, speed, "over");
  };

  Anim.prototype.out = function ($el, speed) {
    this.from($el, speed, "over");
  };

  Anim.prototype.fromTo = function (
    $el,
    speed,
    fromClassName,
    toClassName,
    callback
  ) {
    this.remove($el, fromClassName);
    tM.to(
      $el.not(' .' + toClassName),
      Anim.speed[speed],
      {
        css: { className: "+=" + toClassName },
        onComplete: callback
      }
    );
  };
})();
