define([
  'pixi'
], function(PIXI) {
  var Text = function(text, style) {
    PIXI.Text.call(this, text, style);
    
    this.anchor.set(0.5, 0.5);
  };
  
  extend(Text, PIXI.Text);
  
  return Text;
});
