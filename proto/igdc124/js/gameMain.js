/**
 * Game Main
 *
 */
define(['pixi/pixi', 'core/base', 'game/game'], function (PIXI, Base, Game) {
    var GameMain = function () {
        Base.GameObject.call(this);

        this.interactive = true;
    };

    return extend(GameMain, Base.GameObject, {
        loading: function() {
            this.loadingText = new PIXI.Text('Loading...', {font: '72px monospace', fill: '#fff', align: 'center'});
            this.loadingText.x = -this.loadingText.width/2;
            this.loadingText.y = -this.loadingText.height/2;
            this.addChild(this.loadingText);
        },
        startGame: function () {
            this.removeChild(this.loadingText);
            this.addChild(new Game());
        }
    });
});
