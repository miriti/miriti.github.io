define([
  './Animation'
],
function(Animation) {
  var Rotate = function(from, to, totalTime, easing) {
    Animation.call(this, totalTime, easing);
    
    this.from = from;
    this.to = to;
  };
  
  extend(Rotate, Animation);
  
  Rotate.prototype.update = function(subject, delta) {
    if(!this.isFinished(delta)) {
      subject.rotation = this.easing(this.from, this.to, this.t);
    }
  };
  
  return Rotate;
});
