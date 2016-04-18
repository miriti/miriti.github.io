define([
  './Tool',
  '../tiles/towers/CircleTower',
  '../tiles/towers/SquareTower',
  '../tiles/towers/TriangleTower',
  '../ui/FloatText'
],
function(Tool,
         CircleTower,
         SquareTower,
         TriangleTower,
         FloatText) {
  
  CircleTower.prototype.next = SquareTower;
  SquareTower.prototype.next = TriangleTower;
  TriangleTower.prototype.next = CircleTower;
  
  var Build = function(Tile) {
    Tool.call(this);
    
    this._Tile = Tile;

    this.preview = new Tile();
    this.preview.interactive = false;
    this.preview.showHealthBar = false;
    this.preview.distanceField.visible = true;
    this.preview.alpha = 0.5;
  };
  
  extend(Build, Tool);
  
  Build.prototype.use = function(map, point) {
    if(map.getTileAt(point.x, point.y) == null) {
      var tile = new this._Tile();
      
      if(map.parent.money >= tile.price) {
        map.putTile(tile, point.x, point.y);
        map.currentTool = null;
        
        var money = new FloatText("-$" + tile.price, {font: "bold 60px monospace", fill: 0x00aa00});
        money.position.set(tile.x, tile.y);
        map.addChild(money);
        
        map.parent.money -= tile.price;
      }
    }
  };
  
  return Build;
});
