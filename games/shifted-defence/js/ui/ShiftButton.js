define([
  'jig/Container',
  'jig/Button',
  'jig/shapes/Quad',
  'jig/Text'
],
function(Container,
         Button,
         Quad,
         Text) {
  var ShiftButton = function() {
    
    var genButton = function(scale) {
      var content = new Container();
      
      content.build({
        bg: {
          is: new Quad(0xffffff, 400, 150),
          alpha: 0.6
        },
        text: {
          is: new Text("SHIFT!!!", {font: "bold 80px monospace", fill: 0xffffff})
        }
      });
      
      content.scale.set(scale);
      
      return content;
    }
    
    this._super([genButton(1), genButton(1), genButton(0.9)]);
  };
  
  extend(ShiftButton, Button);
  
  return ShiftButton;
})
