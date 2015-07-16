define(['core/base', 'game/map/tiles'], function (Base, Tiles) {
    var MapSelection = function () {
        this.length = 0;
    };

    MapSelection.prototype.addToSelection = function (tile) {
        this[this.length.toString()] = tile;
        this.length++;
    };

    MapSelection.prototype.contains = function () {
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this[i].length; j++) {
                for (var a in arguments) {
                    if (this[i][j] instanceof arguments[a]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    MapSelection.prototype.all = function () {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            if (typeof this[i] !== "undefined") {
                for (var j = 0; j < this[i].length; j++) {
                    result.push(this[i][j]);
                }
            }
        }

        return result;
    };

    MapSelection.prototype.getTypes = function () {
        var all = this.all();
        var result = [];

        for (var i in all) {
            for (var a in arguments) {
                if (all[i] instanceof arguments[a])
                    result.push(all[i]);
            }
        }

        return result;
    };

    /**
     * Map
     *
     * @param cols
     * @param rows
     * @constructor
     */
    var Map = extend(function () {
        Base.GameObject.call(this);

        this.tiles = [];
        this.interactive = true;
    }, Base.GameObject);

    Map.prototype.removeTile = function (tile) {
        var index = this.tiles[tile.cellX][tile.cellY].indexOf(tile);
        if (index !== -1) {
            this.tiles[tile.cellX][tile.cellY].splice(index, 1);
            this.removeChild(tile);
        }
    };

    Map.prototype.getTile = function (cellX, cellY) {
        if (this.tiles[cellX] && this.tiles[cellY]) {
            return this.tiles[cellX][cellY];
        }
        return null;
    };

    Map.prototype.selectNeighbours = function (cellX, cellY) {
        var sel = new MapSelection();
        if (this.getTile(cellX - 1, cellY)) sel.addToSelection(this.tiles[cellX - 1][cellY]);
        if (this.getTile(cellX + 1, cellY)) sel.addToSelection(this.tiles[cellX + 1][cellY]);
        if (this.getTile(cellX, cellY + 1)) sel.addToSelection(this.tiles[cellX][cellY + 1]);
        if (this.getTile(cellX, cellY - 1)) sel.addToSelection(this.tiles[cellX][cellY - 1]);
        return sel;
    };

    /**
     * Initialize the map
     */
    Map.prototype.init = function (cols, rows, InitTile) {
        InitTile = InitTile || Tiles.Grass;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var tile = new InitTile();
                this.putTile(i, j, tile)
            }
        }
    };

    /**
     * Put a tile on the Map
     */
    Map.prototype.putTile = function (cellX, cellY, tile) {
        if (typeof this.tiles[cellX] === 'undefined') {
            this.tiles[cellX] = [];
        }

        if (typeof this.tiles[cellX][cellY] === 'undefined') {
            this.tiles[cellX][cellY] = [];
        }

        this.tiles[cellX][cellY].push(tile);

        tile.x = cellX * (Tiles.Tile.SIZE);
        tile.y = cellY * (Tiles.Tile.SIZE);
        this.addChild(tile);
        tile.put(cellX, cellY);

        return tile;
    };

    Map.prototype.resize = null;

    return Map;
});
