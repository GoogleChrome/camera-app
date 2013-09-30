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
camera.effects.Cinema = function(tracker) {
  camera.Effect.call(this, tracker);

  /**
   * @param {number}
   * @private
   */
  this.mode_ = 0;

  // End of properties. Seal the object.
  Object.seal(this);
};

camera.effects.Cinema.prototype = {
  __proto__: camera.Effect.prototype
};

/**
 * @override
 */
camera.effects.Cinema.prototype.randomize = function() {
  // TODO(mtomasz): To be implemented.
  this.mode_ = (this.mode_ + 1) % 3;
};

/**
 * @override
 */
camera.effects.Cinema.prototype.filterFrame = function(canvas) {
  var face = this.tracker_.getFace();
  x = canvas.width * (face.x + (face.width / 2));
  y = canvas.height * face.y * 1.5;
  radius = Math.sqrt(face.width * face.width +
                     face.height * face.height) * canvas.width;

  canvas.tiltShift(0,
                   y,
                   canvas.width - 1,
                   y,
                   radius / 15.0,
                   canvas.height * 1.1);
  canvas.brightnessContrast(0.1, 0.2).
    vibrance(-1).
    vignette(0.5, 0.4);
};

/**
 * @override
 */
camera.effects.Cinema.prototype.getTitle = function() {
  return chrome.i18n.getMessage('cinemaEffect');
};

/**
 * @override
 */
camera.effects.Cinema.prototype.isSlow = function() {
  return true;
};

