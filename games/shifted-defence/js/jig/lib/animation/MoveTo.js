define([
  './Move'
],
function(Move) {
  var MoveTo = function(x, y, totalTime, easing) {
    Move.call(this, undefined, [x, y], totalTime, easing);
  };

  extend(MoveTo, Move);

  MoveTo.prototype.update = function(subject, delta) {
    if (this.from === null) {
      this.from = new PIXI.Point(subject.x, subject.y);
    }

    Move.prototype.update.call(this, subject, delta);
  };

  return MoveTo;
});
