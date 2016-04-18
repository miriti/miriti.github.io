define([],
function(Animated,
         Schedule,
         Updatable) {
           
  var components = {
    'Animated': Animated,
    'Schedule': Schedule,
    'Updatable': Updatable
  };
           
  var ComponentContainer = function() {};

  /**
   * Add a component
   */
  ComponentContainer.prototype.addComponent = function(ComponentClass) {
    var component = new ComponentClass();
    
    this._components = this._components || [];
    
    this._components.push(ComponentClass);
    
    if(ComponentClass._properties) {
      Object.defineProperties(this, ComponentClass._properties);
    }

    for(var prop in component) {
      if(!this[prop]) {
        this[prop] = component[prop];
      } else {
        if(this[prop]['call']) {
          this._funcs = this._funcs || [];
          if(this._funcs[prop]) {
            this._funcs[prop].push(component[prop]);
          } else {
            this._funcs[prop] = [this[prop], component[prop]];
            this[prop] = this._execComponentFuncs(prop);
          }
        } else {
          console.warn('Component overrides a property <%s>', prop);
        }
      }
    }
    
    return this;
  };

  /**
   * Add array of components
   */
  ComponentContainer.prototype.addComponents = function(components) {
    components.forEach(function(component) {
      this.addComponent(component);
    }, this);
  };

  /**
   * Execute functions with the same name
   */
  ComponentContainer.prototype._execComponentFuncs = function(prop) {
    return function() {
      for(var f in this._funcs[prop]) {
        this._funcs[prop][f].apply(this, arguments);
      }
    }
  };

  return ComponentContainer;
});
