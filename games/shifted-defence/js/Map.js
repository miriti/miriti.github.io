define([
        'jig/Container',
        'jig/shapes/Quad',
        './tiles/Tile',
        './tiles/Grass',
        './tiles/Base',
        './waves/Waves',
        './waves/Wave1',
        './waves/Wave2',
        './waves/Wave3',
        './waves/Wave4',
        './ui/BuildForbidden'
    ],
    function (Container,
        Quad,
        Tile,
        Grass,
        Base,
        Waves,
        Wave1,
        Wave2,
        Wave3,
        Wave4,
        BuildForbidden) {

        var Map = function (width, height) {
            this._super();
            this.minTileX = -width / 2;
            this.maxTileX = width / 2;
            this.minTileY = -height / 2;
            this.maxTileY = height / 2;

            this.entities = [];
            this.buildings = [];

            var background = new Container();

            this._map = {};

            for (var i = -width / 2; i < width / 2; i++) {
                this._map[i] = {};

                for (var j = -height / 2; j < height / 2; j++) {
                    this._map[i][j] = null;
                    
                    var bgTile = new Quad(0x222222, (Tile.SIZE-2), (Tile.SIZE-2));
                    bgTile.position.set(i*Tile.SIZE, j*Tile.SIZE);
                    background.addChild(bgTile)
                }
            }
            
            this.addChild(background);
            
            this.base = new Base();
            this.putTile(this.base, 0, 0);

            this.addChild(new Waves({
                sequence: [
                    new Wave1,
                    new Wave2,
                    new Wave3,
                    new Wave4
                ],
                delayBetweenWaves: 3,
                delayBetweenSequences: 10,
            }, this));

            this.interactive = this.buttonMode = true;

            this._currentTool = null;

            this._buildForbidden = new BuildForbidden();
        };

        extend(Map, Container);

        Object.defineProperties(Map.prototype, {
            currentTool: {
                set: function (value) {
                    if (this._currentTool && this._currentTool.preview) {
                        this.removeChild(this._currentTool.preview);
                    }

                    this._currentTool = value;

                    if (this._currentTool && this._currentTool.preview) {
                        this._currentTool.preview.visible = false;
                        this.addChild(this._currentTool.preview);
                    }
                },
                get: function () {
                    return this._currentTool;
                }
            }
        })

        Map.prototype.getTileCoord = function (point) {
            return {
                x: Math.floor((point.x + Tile.SIZE / 2) / Tile.SIZE),
                y: Math.floor((point.y + Tile.SIZE / 2) / Tile.SIZE)
            };
        };

        Map.prototype.mousemove = function (event) {
            var point = event.data.getLocalPosition(this, event.data.global);
            var tile = this.getTileCoord(point);

            if ((tile.x > this.minTileX) && (tile.x < this.maxTileX) && (tile.y > this.minTileY) && (tile.y < this.maxTileY)) {

                if (this.currentTool && this.currentTool.preview) {
                    this.currentTool.preview.position.set(tile.x * Tile.SIZE, tile.y * Tile.SIZE);

                    if ((!(this.currentTool.preview.visible = (this._map[tile.x][tile.y] == null))) || (this.parent.money < this.currentTool.preview.price)) {
                        this._buildForbidden.position.set(tile.x * Tile.SIZE, tile.y * Tile.SIZE);
                        this.addChild(this._buildForbidden);
                    } else {
                        this.removeChild(this._buildForbidden);
                    }
                } else {
                    this.removeChild(this._buildForbidden);
                }
            }
        }

        Map.prototype.mousedown = function (event) {
            var point = event.data.getLocalPosition(this, event.data.global);
            var tile = this.getTileCoord(point);

            if (this.currentTool) {
                this.currentTool.use(this, tile);
            }
        };

        Map.prototype.putTile = function (tile, cellX, cellY, replace) {


            if ((this._map[cellX][cellY] !== null) && (replace)) {
                this.removeTile(cellX, cellY);
            }
            this._map[cellX][cellY] = tile;
            tile.position.set(cellX * Tile.SIZE, cellY * Tile.SIZE);
            tile.map = this;
            tile.cell.x = cellX;
            tile.cell.y = cellY;
            this.addChild(tile);

            this.buildings.push(tile);

            if(tile.onBuild) {
                tile.onBuild(this);
            }

        };

        Map.prototype.removeTile = function (cellX, cellY) {
            var tile = this._map[cellX][cellY];

            if (tile) {
                this.buildings.splice(this.buildings.indexOf(tile), 1);

                this._map[cellX][cellY] = null;
                this.removeChild(tile);
                tile.map = null;
            }
        };

        Map.prototype.getTileAt = function (cellX, cellY) {
            var tile = this._map[cellX][cellY];

            if (!tile) {
                return null;
            }

            return this._map[cellX][cellY];

        }

        Map.prototype.spawn = function (x, y, type) {
            var entity = new type(this, x, y);

            var target = this.getTileAt(0, 0);
            // entity.setGoal(target);

            this.entities.push(entity);
            this.addChild(entity);

            return entity;

        }

        Map.prototype.queryTiles = function (filterFunc) {
            var result = [];

            filterFunc = filterFunc || function () {
                    return true;
                };

            for (var x in this._map) {
                for (var y in this._map[x]) {
                    if ((this._map[x][y] != null) && (filterFunc) && (filterFunc(this._map[x][y]))) {
                        result.push(this._map[x][y]);
                    }
                }
            }

            return result;
        }

        return Map;

    });
