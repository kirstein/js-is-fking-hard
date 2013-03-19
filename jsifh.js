/**
 * JavaScript is fcking hard.
 * Copyright 2013, Mikk Kirstein.
 *
 * No errors, no headaches! Run everything!
 */
;(function (global) {
  var proxy = global.eval;

  global._evalCounters = {};

  function addCounters(target, counterName) {
    return target.replace(/;/g, "\n_evalCounters['" + counterName + "']+=1\n");
  }

  function clearEmpty(target) {
     var cleared = target.split(';'),
        i, row;

    for (i = cleared.length - 1; i >= 0 ; i -= 1) {
      row = cleared[i];

      if (typeof row === "undefined" || !row.length) {
        cleared.splice(i, 1);
      }
    }

    return cleared.join(';');
  }

  /**
   * Override the eval. Because fuck you, thats why!
   */
  global.eval = function (rawTarget) {
    var counterName = Math.random().toString(36).substring(7),
        result, lineNr, lines;

    // Remove empty lines
    rawTarget = clearEmpty(rawTarget);

    // Wait until we have a result
    while (true) {

      global._evalCounters[counterName] = 0;
      target = addCounters(rawTarget, counterName);
      try {
        result = proxy.call(this, target);
        // Cleanup
        global._evalCounters[counterName] = undefined;
        // Sooooo nothing bad happend? Lets return
        return result;
      } catch (error) {
        lineNr = _evalCounters[counterName];
        lines  = rawTarget.split(';');
        lines.splice(lineNr, 1);
        rawTarget = lines.join(';');
      }
    }
    // Fuck it, lets wait
  };
})(this);
