var data = [
  "1+2",
  "broken-strings-suck",
  "[]",
  "so-do-broken-bones",
  "but-thankfully",
  "we-still-have-functions",
  "(function() {",
    "console.log('that run')",
    "sometimes-tho",
  "})();",
  "alert('bingo was his name Oooh')"
];


eval(data.join('\r\n'));
