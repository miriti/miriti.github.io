define([
  'jig/Game',
  './Menu',
  './data'
],
function(Game,
         Menu,
         data) {
  return new Game()
    .config({
      width: 1920,
      height: 1080,
      responsive: true,
    })
    .data(data)
    .run(function() {
      this.setState(new Menu(), 'menu');
    });
});
