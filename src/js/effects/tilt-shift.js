/**
 * Namespace for the Camera app.
 */
var camera = camera || {};

/**
 * Namespace for effects.
 */
camera.effects = camera.effects || {};

/**
 * @private {camera.Tracker} tracker
 * @constructor
 * @extend {camera.Effect}
 */
camera.effects.TiltShift = function(tracker) {
  camera.Effect.call(this, tracker);

  /**
   * @type {number}
   * @private
   */
  this.amount_ = 75;

  /**
   * @type {number}
   * @private
   */
  this.gradient_ = 2;

  // End of properties. Seal the object.
  Object.seal(this);
};

camera.effects.TiltShift.prototype = {
  __proto__: camera.Effect.prototype
};

/**
 * @override
 */
camera.effects.TiltShift.prototype.randomize = function() {
  this.amount_ = Math.random() * 100 + 50;
  this.gradient_ = Math.random() * 4 + 1;
};

/**
 * @override
 */
camera.effects.TiltShift.prototype.filterFrame = function(canvas) {
  canvas.tiltShift(0,
                   canvas.height * 0.4,
                   canvas.width - 1,
                   canvas.height * 0.4,
                   canvas.width / this.amount_,
                   canvas.height / this.gradient_);
};

/**
 * @override
 */
camera.effects.TiltShift.prototype.getTitle = function() {
  return chrome.i18n.getMessage('tiltShiftEffect');
};

/**
 * @override
 */
camera.effects.TiltShift.prototype.isSlow = function() {
  return true;
};

