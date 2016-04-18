define([
  'jig/Container',
  'jig/shapes/Quad',
  'jig/Text',
  'jig/Button'
],
function(Container,
         Quad,
         Text,
         Button) {
           
  var TowerButton = function(Tile) {
    
    var genContent = function(hl) {
      var buttonContent = new Container();
      
      var tile = new Tile();
      tile.showHealthBar = false;
      
      buttonContent.build({
        back: {
          is: new Quad(0x888888, 220, 220),
          y: 30,
          alpha: hl ? 0.8 : 0.6
        },
        image: {
          is: tile,
          interactive: false
        },
        name: {
          is: new Text(tile.name, {font: "26px monospace", fill: 0xffffff}),
          y: 80
        },
        price: {
          is: new Text('$' + tile.price, {font: "bold 20px monospace", fill: 0xeeeeee}),
          y: 110
        }
      });
      
      return buttonContent;
    }
    
    this._super([genContent(), genContent(true)]);
  };
  
  extend(TowerButton, Button);
  
  Object.defineProperties(TowerButton.prototype, {
    selected: {
      set: function(value) {},
      get: function() {}
    }
  })
  
  return TowerButton;
});
