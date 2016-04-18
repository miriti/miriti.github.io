define([], function() {
  var Updatable = function() {
    this.updating = true;
  };

  Updatable.prototype.update = function(delta) {
    if (this.updating) {
      if (this.children) {
        for (var i in this.children) {
          if (this.children[i]['update']) {
            this.children[i].update(delta);
          }
        }
      }
    }
  };

  return Updatable;
});
