define([
  'pixi'
],
function(PIXI) {
  var Shape = function(fill) {
    PIXI.Graphics.call(this);
    this.beginFill(fill);
  };
  
  extend(Shape, PIXI.Graphics);
  
  return Shape;
});
