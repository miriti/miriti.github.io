define([
  'jig/animation/MoveTo',
  'jig/animation/Alpha',
  'jig/animation/RotateTo',
  'jig/animation/ScaleTo'
], function(MoveTo,
            Alpha,
            RotateTo,
            ScaleTo) {
  var Animated = function() {
    this._animated_anims = [];
    this._animated_index = 0;
    this._animated_finished = false;
  };
  
  Animated.prototype.moveTo = function(x, y, totalTime, easing, after) {
    return this.addAnimation(new MoveTo(x, y, totalTime, easing), after);
  };
  
  Animated.prototype.animAlpha = function(from, to, totalTime, easing, after) {
    return this.addAnimation(new Alpha(from, to, totalTime, easing), after);
  };
  
  Animated.prototype.rotateTo = function(to, totalTime, easing, after) {
    return this.addAnimation(new RotateTo(to, totalTime, easing), after);
  };
  
  Animated.prototype.scaleTo = function(to, totalTime, easing, after) {
    return this.addAnimation(new ScaleTo(to, totalTime, easing), after);
  };
  
  Animated.prototype.resetAnimation = function() {
    this._animated_anims = [];
    
    return this;
  };

  Animated.prototype.addAnimation = function(anim, after) {
    if (anim.constructor !== Array) {
      anim = [anim];
    }
    
    this._animated_anims.push({
      list: anim,
      after: after
    });
    
    this._animated_finished = false;

    return this;
  };

  Animated.prototype.update = function(delta) {
    if (this._animated_index < this._animated_anims.length) {
      var current = this._animated_anims[this._animated_index].list;

      var activeAnims = current.filter(function(anim) {
        return !anim.finished;
      });

      if (activeAnims.length > 0) {
        for (var i in activeAnims) {
          activeAnims[i].update(this, delta);
        }
      } else {
        if(this._animated_anims[this._animated_index].after) {
          this._animated_anims[this._animated_index].after.call(this);
        }
        this._animated_index++;
      }
    } else {
      if(!this._animated_finished) {
        this._animated_finished = true;
      }
    }
  };

  return Animated;
});
