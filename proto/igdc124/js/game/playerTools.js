define([
    'pixi/pixi',
    'res',
    'core/input',
    'game/hud/money'
], function (PIXI,
             res,
             Input,
             Money) {
    var Tool = function () {
        this.player = null;
        this.sprite = null;
    };

    Tool.prototype = {
        name: '',
        choosen: function () {
        },
        dropped: function () {
        },
        down: function (tile) {
        },
        up: function (tile) {
        },
        move: function (map) {
        },
        over: function (tile) {
        }
    };

    /**
     * Move tool
     *
     * @constructor
     */
    var Move = extend(function () {
        Tool.call(this);

        this.name = 'move';
        this.drag = null;
    }, Tool);

    Move.prototype.down = function (tile) {
        this.drag = {
            mouse: {
                x: Input.instance.Mouse.x,
                y: Input.instance.Mouse.y
            }
        };
    };

    Move.prototype.up = function (tile) {
        this.drag = null;
    };

    Move.prototype.move = function (map) {
        if (this.drag !== null) {
            map.x += (Input.instance.Mouse.x - this.drag.mouse.x);
            map.y += (Input.instance.Mouse.y - this.drag.mouse.y);
            this.drag.mouse = {
                x: Input.instance.Mouse.x,
                y: Input.instance.Mouse.y
            }
        }
    };

    var Build = function () {
        Tool.call(this);
        this.Tile = null;
        this.name = 'build';
        this._forbinned = null;
    };

    extend(Build, Tool);

    Build.prototype.choosen = function () {
        this.Tile = null;
    };

    Build.prototype.over = function (tile) {
        if ((tile.buildAvailable) && (this.Tile !== null)) {
            var newTile = new this.Tile();
            if (newTile.buildPrice <= this.player.money) {
                newTile.cellX = tile.cellX;
                newTile.cellY = tile.cellY;

                if (newTile.checkBuild(tile.map, tile.cellX, tile.cellY)) {
                    this.sprite = this._buldTile;
                    return;
                }
            }
        }

        if (this._forbinned == null) {
            this._forbinned = new PIXI.Sprite(res.getTexture('forbidden'));
            this._forbinned.alpha = 0.5;
        }
        this.sprite = this._forbinned;
    };

    Build.prototype.down = function (tile) {
        if ((tile.buildAvailable) && (this.Tile !== null)) {
            var newTile = new this.Tile();
            if (newTile.buildPrice <= this.player.money) {
                newTile.cellX = tile.cellX;
                newTile.cellY = tile.cellY;

                if (newTile.checkBuild(tile.map, tile.cellX, tile.cellY)) {
                    tile.map.putTile(tile.cellX, tile.cellY, newTile);
                    this.player.money -= newTile.buildPrice;

                    var m = new Money(-newTile.buildPrice);
                    m.x = newTile.x + newTile.width / 2;
                    m.y = newTile.y + newTile.height / 2;
                    tile.map.addChild(m);
                } else {
                    // TODO Show message "Can't build there"
                }
            } else {
                // TODO "Not enough money" message should be displayed here
            }
        }
    };

    Build.prototype.setTile = function (TileType) {
        this.Tile = TileType;

        var t = new TileType();
        t.interactive = false;
        t.alpha = 0.5;

        this._buldTile = t;
    };

    /**
     * Demolition
     */
    var Demolition = extend(function () {
        Tool.call(this);
        this.name = 'demolition';
    }, Tool);

    Demolition.prototype.down = function (tile) {
        tile.destroy();
    };

    return {
        Demolition: new Demolition(),
        Build: new Build(),
        Move: new Move()
    }
});