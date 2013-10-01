'use strict';

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
camera.effects.Andy = function(tracker) {
  camera.Effect.call(this, tracker);
  Object.freeze(this);
};

camera.effects.Andy.prototype = {
  __proto__: camera.Effect.prototype
};

/**
 * @override
 */
camera.effects.Andy.prototype.filterFrame = function(canvas) {
  var face = this.tracker_.face;
  x = canvas.width * (face.x + (face.width / 2));
  y = canvas.height * face.y;
  radius = Math.sqrt(face.width * face.width +
                     face.height * face.height) * canvas.width / 5;
  canvas.bulgePinch(x, y - radius, radius, -1);
};

/**
 * @override
 */
camera.effects.Andy.prototype.getTitle = function() {
  return chrome.i18n.getMessage('andyEffect');
};

