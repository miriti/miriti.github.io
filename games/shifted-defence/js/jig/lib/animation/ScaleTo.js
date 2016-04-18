define([
  './Scale'
],
function(Scale) {
  var ScaleTo = function(to, totalTime, easing) {
    Scale.call(this, null, to, totalTime, easing);
  };
  
  extend(ScaleTo, Scale);
  
  ScaleTo.prototype.update = function(subject, delta) {
    if(this.from === null) {
      this.from = subject.scale.x;
    };
    
    Scale.prototype.update.call(this, subject, delta);
  };
  
  return ScaleTo;
});
