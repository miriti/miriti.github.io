define([
  'jig/ComponentContainer'
],
function(ComponentContainer) {
  var extend = function(a, b, components) {
    a.prototype = Object.create(b.prototype);
    
    if(b !== ComponentContainer) {
      var componentContainer = Object.create(ComponentContainer.prototype);

      for(var f in componentContainer) {
        a.prototype[f] = componentContainer[f];
      }
    }

    a.prototype.constructor = a;
    
    a.prototype._super = function(superArgs, components) {
      b.apply(this, superArgs);
      
      if(components)
        this.addComponents(components);
    };

    return a;
  };
  
  return window['extend'] = extend;
});
