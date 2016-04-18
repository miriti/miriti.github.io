define([
  './Tile',
  'jig/shapes/Quad'
],
function(Tile,
         Quad) {
  var Grass = function() {
    this._super();
    
    this.addChild(new Quad(0x00ff00, Tile.SIZE, Tile.SIZE));
    
    this.solid = false;
  };
  
  extend(Grass, Tile);
  
  return Grass;
})
