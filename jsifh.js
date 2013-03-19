/**
 * JavaScript is fcking hard.
 * Copyright 2013, Mikk Kirstein.
 *
 * No errors, no headaches! Run everything!
 */
;(function (global) {
  var proxy = global.eval;

  global.__evalCounters = {};

  /**
   * Adds counter values after each line of given source.
   *
   * @return the "new" and improved source.
   */
  function addCounters(source, counterName) {
    return source.replace(/;/g, ";__evalCounters['" + counterName + "']+=1;");
  }

  /**
   * Clears empty rows.
   * @return new string without empty fields.
   */
  function clearEmpty(target) {
     var cleared = target.replace(/\n/g, ';').split(';'),
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
        result, target;

    // Remove empty lines
    rawTarget = clearEmpty(rawTarget);

    // Wait until we have a result
    while (true) {

      global.__evalCounters[counterName] = 0;
      target = addCounters(rawTarget, counterName);
      // Run it till it passes
      try {
        result = proxy.call(this, target);
        // Cleanup
        delete global.__evalCounters[counterName];
        // Sooooo nothing bad happend? Lets return
        return result;
      } catch (error) {
        var lineNr, lines;

        lineNr = global.__evalCounters[counterName];
        lines  = rawTarget.split(';');
        lines.splice(lineNr, 1);
        rawTarget = lines.join(';');
      }
    }
    // Fuck it, lets wait
  };
})(this);
