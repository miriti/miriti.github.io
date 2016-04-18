define([
  'jig/Container',
  'jig/shapes/Quad'
],
function(Container,
         Quad) {
  var BuildForbidden = function() {
    this._super();
    
    this.build({
      cross: {
        is: new Container(),
        build: {
          line1: {
            is: new Quad(0xff0000, 100, 30)
          },
          line2: {
            is: new Quad(0xff0000, 100, 30),
            rotation: Math.PI/2
          }
        },
        rotation: Math.PI/4
      }
    });
  };
  
  extend(BuildForbidden, Container);
  
  return BuildForbidden;
});
