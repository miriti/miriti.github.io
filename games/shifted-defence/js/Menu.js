define([
  'jig/Container',
  'jig/Button',
  'jig/Text',
  './GameMain'
],
function(Container,
         Button,
         Text,
         GameMain) {
  var Menu = function() {
    this._super();
    
    this.build({
      startButton: {
        is: new Button(new Text("Start", {font: 'bold 70px monospace', fill: 0xaaaaaa}),
                       new Text("Start", {font: 'bold 70px monospace', fill: 0xffffff}),
                       null,
                       function() {
                         game.setState(new GameMain());
                       })
      }
    });
  };
  
  extend(Menu, Container);
  
  return Menu;
});
