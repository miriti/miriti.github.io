define([
  'pixi',
  'jig/shapes/Quad',
  'jig/Container'
],
function(PIXI,
         Quad,
         Container) {
  var HealthBar = function(width, height, maxValue) {
    this._super();
    
    this.build({
      bg: {
        is: new Quad(0x006600, width, height)
      },
      bar: {
        is: new PIXI.Graphics(),
        x: -width/2,
        y: -height/2
      }
    });
    
    this._maxValue = maxValue;
  };
  
  extend(HealthBar, Container);
  
  Object.defineProperties(HealthBar.prototype, {
    value: {
      set: function(value) {
        this._value = value;
        
        this.bar.clear();
        this.bar.beginFill(0x00ff00);
        this.bar.drawRect(0, 0, this.width * (this._value / this._maxValue), this.height);
        this.bar.endFill();
      },
      get: function() {
        return this._value || 0;
      }
    }
  })
  
  return HealthBar;
});
