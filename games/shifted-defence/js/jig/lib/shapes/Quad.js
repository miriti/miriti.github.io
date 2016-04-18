define([
  './Shape'
],
function(Shape) {
  var Quad = function(fill, width, height) {
    this._super([fill]);
    this.drawRect(-width/2, -height/2, width, height);
    this.endFill();
  };
  
  extend(Quad, Shape);
  
  return Quad;
});
