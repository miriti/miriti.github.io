define([
  './Rotate'
],
function(Rotate) {
  var RotateTo = function(to, totalTime, easing) {
    Rotate.call(this, null, to, totalTime, easing);
  };

  extend(RotateTo, Rotate);

  RotateTo.prototype.update = function(subject, delta) {
    if (this.from === null) {
      this.from = subject.rotation;
    }
    
    Rotate.prototype.update.call(this, subject, delta);
  };
  
  return RotateTo;
});
