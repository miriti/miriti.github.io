define([
  'jig/Container',
  'jig/components/Animated'
],
function(Container,
         Animated) {
  var Button = function(upState, overState, downState, action) {
    Container.call(this);
    
    this.addComponent(Animated);
    
    this.upState = upState;
    this.overState = overState || upState;
    this.downState = downState || overState || upState;
    
    this.interactive = this.buttonMode = true;
    this.addChild(this.upState);
    
    if(action) {
      this.action = action;
    }
  };
  
  extend(Button, Container);
  
  Button.prototype.action = function(){};
  
  Button.prototype.mouseover = function() {
    this.removeChild(this.upState);
    this.addChild(this.overState);
  };
  
  Button.prototype.mouseout = function() {
    this.removeChild(this.overState);
    this.addChild(this.upState);
  };
  
  Button.prototype.mousedown = function() {
    this.removeChild(this.overState);
    this.addChild(this.downState);
  };
  
  Button.prototype.mouseup = function() {
    this.removeChild(this.downState);
    this.addChild(this.overState);
    
    if((this.action) && (this.action.call)) {
      this.action.call(this);
    }
  };
  
  return Button;
});
