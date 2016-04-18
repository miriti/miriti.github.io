define([
  'jig/Container',
  'jig/shapes/Quad',
  'jig/Text',
  'jig/Button',
  'jig/components/Animated',
  'jig/animation/Move',
  'jig/animation/Alpha'
],
function(Container,
         Quad,
         Text,
         Button,
         Animated,
         Move,
         Alpha) {
  var GameOver = function() {
    Container.call(this);
    
    this.addComponent(Animated);
    
    this.alpha = 0;
    
    this.build({
      bg: {
        is: new Quad(0x0, 1920, 1080),
        alpha: 0.7
      },
      gameOver: {
        is: new Text("Game Over!", {font: "bold 100px monospace", fill: 0xaa0000})
      }
    });
    
    this.animAlpha(0, 1, 1, null, function() {
      this.gameOver.addComponent(Animated).moveTo(0, -200, 1, null, (function() {
        var tryAgain = new Button(new Text("Try Again", {font: "bold 80px monospace", fill: 0xaaaaaa}),
                                  new Text("Try Again", {font: "bold 80px monospace", fill: 0xffffff}));
        
        tryAgain.alpha = 0;
        
        tryAgain.addAnimation([new Alpha(0, 1, 1), new Move([0, 400], [0, 100], 1)]);
        
        tryAgain.action = function() {
          game.setState('menu');
        }
        
        this.addChild(tryAgain);
      }).bind(this));
    });
  };
  
  extend(GameOver, Container);
  
  return GameOver;
})
