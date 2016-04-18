define([
  'pixi'
],
function(PIXI) {
  var Vector = function(x, y) {
    this._super([x, y]);
  };
  
  extend(Vector, PIXI.Point);
  
  /**
   * Returns the length of the vector
   */
  Vector.prototype.length = function() {
    return Math.sqrt(this.length2());
  };
  
  /**
   * Calculates length without taking a square root for faster distance calculations
   */
  Vector.prototype.length2 = function() {
    return this.x * this.x + this.y * this.y;
  };
  
  /**
   * Returns atan2 of the vector
   */
  Vector.prototype.atan2 = function() {
    return Math.atan2(this.y, this.x);
  };
  
  
  // Gets the normalized length from this to other
  Vector.prototype.getDirectionTo = function(other) {
    var dx = other.x - this.x;
    var dy = other.y - this.y;

    var length = this.getDistanceTo(other);

    var x = dx / length;
    var y = dy / length;

    return new Vector(x, y);
    
  }

  // Gets the length from this to other
  Vector.prototype.getDistanceTo = function(other) {
    var dx = other.x - this.x;
    var dy = other.y - this.y;

    var length = Math.sqrt(dx * dx + dy * dy);

    return length;

  }

  // Gets the angle from this to other
  Vector.prototype.getAngleTo = function(other) {
    var direction = this.getDirectionTo(other);
    var rotation = Math.atan2(direction.y, direction.x);

    return rotation;

  };
  
  Vector.prototype.setLength = function(len) {
    
    var current_length = this.length();
    
    this.x = (this.x / current_length) * len;
    this.y = (this.y / current_length) * len;
    
    return this;
  };
  
  return Vector
});
