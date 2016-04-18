define([
  'pixi',
  './Shape'
],
function(PIXI,
         Shape) {
  var Polygon = function(fill, points) {
    this._super([fill]);
    
    this.polygon = new PIXI.Polygon(points);
    
    this.drawShape(this.polygon);
    this.endFill();
  };
  
  extend(Polygon, Shape);
  
  return Polygon;
});
