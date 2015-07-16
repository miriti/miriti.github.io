/**
 * @todo Generators should consume money for maintenance
 */
define([
    'res',
    'pixi/pixi',
    'game/map/tiles/connectible'
], function (res,
             PIXI,
             Connectible) {
    /**
     * Wind gen
     *
     * @constructor
     */
    var Windgen = function () {
        Connectible.call(this);

        this.buildPrice = 1000;
        this._generates = 10;

        this.availableConnections = ['bottom'];

        this.addChild(new PIXI.Sprite(res.getTexture('windgen-base')));

        var propeller = new PIXI.Sprite(res.getTexture('windgen-prop'));
        propeller.anchor.set(0.5, 0.5);

        propeller.x = this.width / 2;
        this.addChild(propeller);

        this.propeller = propeller;
    };

    extend(Windgen, Connectible);

    Windgen.prototype.update = function (delta) {
        Connectible.prototype.update.call(this, delta);
        this.propeller.rotation += Math.PI * delta;
    };

    return Windgen;
});