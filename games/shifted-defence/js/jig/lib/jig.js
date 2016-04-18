require.config({
  baseUrl: 'js',
  paths: {
    pixi: 'pixi.js/bin/pixi.min',
    jig: 'jig/lib'
  }
});

require([
  'jig/extend',
  'main'
],
function(extend, main) {
  window['extend'] = extend;
  window['game'] = main;
  
  console.log("JIG https://github.com/miriti/jig")
});
