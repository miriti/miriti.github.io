define([
    'res',
    'game/map/tiles/connectible',
    'game/map/tiles/switch'
], function (res, Connectible, Switch) {
    /**
     * Wire
     *
     * @constructor
     */
    var Wire = function (variant, connected) {
        Connectible.call(this);
        
        this.buildPrice = 10;

        this._sprite = null;

        this._sprites = {
            h: null,
            v: null,
            bl: null,
            tl: null,
            tr: null,
            br: null
        };

        for (var v in this._sprites) {
            this._sprites[v] = new PIXI.Sprite(res.getTexture('wire-' + v));
        }

        variant = variant || 'h';

        this.variant = variant;
        this.connected = connected || false;

    };

    extend(Wire, Connectible);

    Wire.prototype.checkBuild = function (map, cellX, cellY) {
        var wires = map.selectNeighbours(cellX, cellY).getTypes(Connectible);

        if (wires.length > 0) {
            for (var i in wires) {
                var pos = wires[i].getPosition(this);

                if (wires[i].canConnect(pos))
                    return true;
            }
        }
        return false;
    };

    Wire.prototype.connect = function (connection) {
        Connectible.prototype.connect.call(this, connection);
        if (this.availableConnections.length == 2) {
            this.availableConnections = [];
        }
        this.variant = this.getVariant();
    };

    Wire.prototype.disconnect = function (connection) {
        Connectible.prototype.disconnect.call(this, connection);
        this.variant = this.getVariant();
    };

    Wire.prototype.getVariant = function () {
        var varinat = '';

        for (var c in this.connections) {
            if (this.connections[c] !== null) {
                varinat += c[0];
            }
        }

        if (varinat.length == 1) {
            switch (varinat) {
                case 'l':
                case 'r':
                    return 'h';
                case 't':
                case 'b':
                    return 'v';
            }
        }

        return varinat;
    };

    Object.defineProperties(Wire.prototype, {
        variant: {
            get: function () {
                return this._variant;
            },
            set: function (variant) {
                if (this._sprites.hasOwnProperty(variant)) {
                    if (this._sprite != null) {
                        this.removeChild(this._sprite);
                    }

                    this._sprite = this._sprites[variant];
                    this.addChild(this._sprite);
                }
            }
        }
    });

    return Wire;
});