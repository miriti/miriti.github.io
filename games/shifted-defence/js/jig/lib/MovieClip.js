define([
  'jig/Container'
],
function(Container) {
  var MovieClip = function() {
    Container.call(this);
  };
  
  extend(MovieClip, Container);
});
