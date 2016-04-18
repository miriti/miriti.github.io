define([
  'jig/components/Updatable',
  'jig/Easing'
],
function(Updatable,
         Easing) {
  var Animation = function(totalTime, easing) {
    this.addComponents([Updatable]);
    
    this.totalTime = totalTime || 1;
    
    if(Easing[easing]) {
      easing = Easing[easing];
    }
    
    this.easing = easing || Easing.default;
    
    this.finished = false;
    
    this._timePassed = 0;
    
    this.t = 0;
  };
  
  extend(Animation, function() {});
  
  Animation.prototype.isFinished = function(delta) {
    if(this.finished) {
      return true;
    }
    
    this.t = Math.min(this._timePassed / this.totalTime, 1);
    
    if(this._timePassed < this.totalTime) {
      this._timePassed += delta;
      return false;
    } else {
      this.finished = true;
    }
    
    return false;
  };
  
  return Animation;
});
