define([
  'jig/LoadingScreen',
  'jig/Text'
],
function(LoadingScreen,
         Text) {
  var JigLoadingScreen = function() {
    LoadingScreen.call(this);
    
    this.text = new Text("Loading...", {fill: "#ffffff", wordWrap: true, align: 'center'});
    this.text.anchor.set(0.5, 0.5);
    this.addChild(this.text);
  };
  
  extend(JigLoadingScreen, LoadingScreen);
  
  JigLoadingScreen.prototype.progress = function(loader) {
    this.text.text = "Loading...\n" + Math.floor(loader.progress) + '%';
  };
  
  return JigLoadingScreen;
});
