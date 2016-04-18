define([
  './Tile',
  '../components/Health'
],
function(Tile,
         Health) {
  var Building = function() {
    Tile.call(this);
    this.addComponent(Health);


    this.health = this.maxHealth = 100;
  };
  
  extend(Building, Tile);
  
  Building.prototype.death = function() {
    if(this.parent) {
      this.parent.removeTile(this.cell.x, this.cell.y);
    }
  };
  
  Building.prototype.mouseover = function() {
    if(this._healthBar) {
      this._healthBar.alpha = 1;
    }
  }
  
  return Building;
});
