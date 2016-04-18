define([
  'pixi',
  'jig/components/Updatable'
], function(PIXI,
            Updatable) {
  var Container = function(children) {
    PIXI.Container.call(this);

    this.addComponent(Updatable);

    children = children || [];

    for(var i in children) {
      this.addChild(children[i]);
    }
    
    this.keyboard = true;
  };

  extend(Container, PIXI.Container);
  
  Container.prototype.build = function(data) {
    var item_index = 0;
    for(var name in data) {
      var is = null;
      
      for(var param in data[name]) {
        switch (param) {
          case 'is':
            is = data[name][param];
            break;
          default:
            if (is !== null) {
              var val = data[name][param];
              
              if(val.call) {
                is[param] = val.call(is, item_index++);
              } else if(param === 'build') {
                is.build(data[name][param]);
              } else {
                is[param] = data[name][param];
              }
            }
        }
      }
      
      if(is) {
        this[name] = is;
        this.addChild(is);
      }
    }
  };
  
  Container.prototype.addChildren = function(children) {
    children.forEach(function(child) {
      this.addChild(child);
    }, this);
  }
  
  Container.prototype.keyDown = function(keyCode) {
    this.children.forEach(function(child) {
      if(child.keyDown)
        child.keyDown(keyCode);
    });
  };
  Container.prototype.keyUp = function(keyCode) {
    this.children.forEach(function(child) {
      if(child.keyUp)
        child.keyUp(keyCode);
    });
  };
  Container.prototype.keyPress = function(keyCode) {
    this.children.forEach(function(child) {
      if(child.keyPress)
        child.keyPress(keyCode);
    });
  };

  return Container;
});
