define([
  './Animation'
],
function(Animation) {
  var Move = function(from, to, totalTime, easing) {
    Animation.call(this, totalTime, easing);
    
    this.from = from ? new PIXI.Point(from[0], from[1]) : null;
    this.to = to ? new PIXI.Point(to[0], to[1]) : null;
  };
  
  extend(Move, Animation);
  
  Move.prototype.update = function(subject, delta) {
    if(!this.isFinished(delta)) {
      if(this.from && this.to) {
        subject.position.x = this.easing(this.from.x, this.to.x, this.t);
        subject.position.y = this.easing(this.from.y, this.to.y, this.t);
      }
    }
  };
  
  return Move;
});
