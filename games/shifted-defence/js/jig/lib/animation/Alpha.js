define([
  './Animation'
],
function(Animation) {
  var Alpha = function(from, to, totalTime, easing) {
    Animation.call(this, totalTime, easing);
    
    this.from = from;
    this.to = to;
  };
  
  extend(Alpha, Animation);
  
  Alpha.prototype.update = function(subject, delta) {
    if(!this.isFinished(delta)) {
      subject.alpha = this.easing(this.from, this.to, this.t);
    };
  };
  
  return Alpha;
});
