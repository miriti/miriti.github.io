define([
  'jig/Container'
],
function(Container) {
  var Tile = function() {
    Container.call(this);
    this.interactive = this.buttonMode = true;
    this.map = null;
    this.solid = false;
    
    this.cell = {x:0,y:0};

  };
  
  Tile.SIZE = 100;
  
  extend(Tile, Container);
  
  return Tile;
});
