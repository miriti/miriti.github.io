define([], function() {
  var Hitable = function() {
    this.hitable = true;
    this.hitRadius = 10;
    this.hitType = '';
  };
  
  return Hitable;
});
