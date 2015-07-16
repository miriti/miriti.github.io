define(['core/base', 'game/map/tiles'], function (Base, Tiles) {
    /**
     * Town
     */
    var Town = extend(function (cnt) {
        this.houseCount = cnt;
        this.townTiles = [];
    }, Base.GameObject);

    Town.prototype.putOnMap = function (map, tileX, tileY) {
        var addedWires = [];

        for (var i = tileX + 1; i <= tileX + this.houseCount; i++) {
            this.townTiles.push(map.putTile(i, tileY, new Tiles.House()));

            this.townTiles.push(map.putTile(i, tileY + 1, new Tiles.Switch((i == tileX + this.houseCount) ? 'lt' : 'h-top')));

            this.townTiles.push(map.putTile(i, tileY + 2, new Tiles.House()));
            this.townTiles.push(map.putTile(i, tileY + 3, new Tiles.Switch((i == tileX + this.houseCount) ? 'lt' : 'h-top')));
        }

        this.townTiles.push(map.putTile(tileX, tileY + 1, new Tiles.Switch('all')));
        this.townTiles.push(map.putTile(tileX, tileY + 2, new Tiles.Wire()));
        this.townTiles.push(map.putTile(tileX, tileY + 3, new Tiles.Wire()));

        for (var t in this.townTiles) {
            this.townTiles[t].autoConnect();
            this.townTiles[t].destroy = function () {
            };
        }
    };

    return Town;
});
