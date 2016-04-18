define([
  './Animation'
], function(Animation) {
  var Scale = function(from, to, time, easing) {
    Animation.call(this, time, easing);
    
    this.from = from;
    this.to = to;
  };
  
  extend(Scale, Animation);
  
  Scale.prototype.update = function(subject, delta) {
    if(!this.isFinished(delta)) {
      subject.scale.set(this.easing(this.from, this.to, this.t));
    }
  };
  
  return Scale;
});
