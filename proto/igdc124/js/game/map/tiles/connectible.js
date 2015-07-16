define([
    'game/map/tiles/tile'
], function (Tile) {
    var Connectible = extend(function () {
        Tile.call(this);

        this._generates = 0;
        this._consumes = 0;

        this.resistance = 1;

        this.availableConnections = ['top', 'bottom', 'left', 'right'];

        this.connections = {
            top: null,
            bottom: null,
            left: null,
            right: null
        };
    }, Tile);

    Connectible.prototype.put = function (cellX, cellY) {
        Tile.prototype.put.call(this, cellX, cellY);
        this.autoConnect();
    };

    /**
     * Delete connection from the list of availbale connections
     *
     * @param conn
     */
    Connectible.prototype.removeConnection = function (conn) {
        var index = this.availableConnections.indexOf(conn);
        if (index !== -1) {
            this.availableConnections.splice(index, 1);
        }
    };

    /**
     * When tile is destroyed
     */
    Connectible.prototype.destroy = function () {
        for (var pos in this.connections) {
            if (this.connections[pos] !== null) {
                this.connections[pos].disconnect(this);
            }
        }
        Tile.prototype.destroy.call(this);
    };

    /**
     * Connect connections
     *
     * @param connection
     */
    Connectible.prototype.connect = function (connection) {
        var pos = this.getPosition(connection);
        if (this.canConnect(pos)) {
            if (this.connections[pos] == null) {
                this.connections[pos] = connection;
                connection.connect(this);
                this.removeConnection(pos);
            }
        }
    };

    /**
     * Disconnect connection
     *
     * @param connection
     */
    Connectible.prototype.disconnect = function (connection) {
        var pos = this.getPosition(connection);
        this.connections[pos] = null;
        this.availableConnections.push(pos);
    };

    /**
     * Connect to nearest possible connection
     *
     */
    Connectible.prototype.autoConnect = function () {
        var tiles = this.map.selectNeighbours(this.cellX, this.cellY).getTypes(Connectible);

        for (var i in tiles) {
            if ((tiles[i].canConnect(tiles[i].getPosition(this)))
                &&
                (this.canConnect(this.getPosition(tiles[i])))) {
                tiles[i].connect(this);
            }
        }
    };

    /**
     * Is connection available
     *
     * @returns {boolean}
     */
    Connectible.prototype.canConnect = function (side) {
        // TODO Detect circular connections!
        if (side) {
            return !(this.availableConnections.indexOf(side) === -1);
        } else {
            return this.availableConnections.length > 0;
        }
    };

    Connectible.prototype.consume = function () {
        var totalEnergy = 0;

        for (var c in this.connections) {
            if (this.connections[c] != null) {
                totalEnergy += this.connections[c].generatesFor(this);
            }
        }

        return totalEnergy;
    };

    Connectible.prototype.generatesFor = function (connection) {
        var result = this._generates;
        var consCount = 0;

        for (var c in this.connections) {
            if ((this.connections[c] != null) && (this.connections[c] != connection)) {

                var g = this.connections[c].generatesFor(this);
                if (g > 0) {
                    result += g;
                } else {
                    consCount++;
                }
            }
        }
        // TODO The value is still invalid! Probably we should add variable parameter that decreases the amount of energy
        return result * this.resistance;
    };

    Object.defineProperties(Connectible.prototype, {
        consumes: {
            get: function () {
                return this._consumes;
            }
        }
    });

    return Connectible;
});