/**
 * TODO: Proper easing functions
 */
define([], function() {
  var Easing = {};
  
  Easing.liniar = function(from, to, t) {
    return from + (to - from) * t;
  };
  
  Easing.sine = function(from, to, t) {
    return from + (to - from) * Math.sin((Math.PI / 2) * t);
  };
  
  Easing.cosine = function(from, to, t) {
    return from + (to - from) * Math.cos((Math.PI / 2) * t);
  };
  
  Easing.quadIn = function(from, to, t) {
    return from + (to - from) * (t * t);
  };
  
  Easing.qubeIn = function(from, to, t) {
    return from + (to - from) * (t * t * t);
  }
  
  Easing.default = Easing.quadIn;
  
  return Easing;
});
