/**
 * JavaScript is fcking hard.
 * Copyright 2013, Mikk Kirstein.
 *
 * No errors, no headaches! Run everything!
 */
;(function (global) {
  var proxy = global.eval, target;

  global.onerror = function (msg, url, lineNr) {
    var lines;
    if (!target || !target.length) {
      return;
    }

    lines = target.split('\n');
    lines.splice(0, lineNr);

    // Next loop cycle
    setTimeout(function() {
      eval(lines.join(''));
    }, 0);

    // Dont allow the REAL handler to run.
    // We dont need them error messages.
    // Messages are for the weak!
    return true;
  };

  /**
   * Override the eval. Because fuck you, thats why!
   */
  global.eval = function (rawTarget) {
    target = rawTarget.replace(/;/g, ";\n");
    proxy.call(this, target);
  };
})(this);

