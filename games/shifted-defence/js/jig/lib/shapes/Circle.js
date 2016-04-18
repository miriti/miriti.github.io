define([
  './Shape'
],
function(Shape) {
  var Circle = function(fill, radius) {
    this._super([fill]);
    
    this.drawCircle(0, 0, radius);
    this.endFill();
  };
  
  extend(Circle, Shape);
  
  return Circle;
})
