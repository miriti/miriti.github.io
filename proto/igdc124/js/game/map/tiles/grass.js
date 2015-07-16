define([
    'res',
    'game/map/tiles/tile'
], function (res,
             Tile) {
    /**
     * Grass
     *
     * @constructor
     */
    var Grass = function () {
        Tile.call(this);

        this.buildAvailable = true;

        var sprite = new PIXI.Sprite(res.getTexture('grass-tile'));
        this.addChild(sprite);
    };

    extend(Grass, Tile);

    Grass.prototype.destroy = function () {
    };

    return Grass;
});