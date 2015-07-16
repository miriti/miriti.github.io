define([
    'res',
    'game/map/tiles/connectible',
    'game/player',
    'game/hud/money'
], function (res,
             Connectible,
             Player,
             Money) {

    /**
     * House
     */
    var House = function () {
        Connectible.call(this);

        this.availableConnections = ['bottom'];

        this._offSprite = new PIXI.Sprite(res.getTexture('house-off'));
        this._onSprite = new PIXI.Sprite(res.getTexture('house-on'));

        this._current = null;
        this._light = true;

        this._consumingTime = 0;

        this.light = false;
    };

    extend(House, Connectible);

    House.prototype.update = function (delta) {
        Connectible.prototype.update.call(this, delta);

        if (this.consume() >= 10) {
            this.light = true;
            this._consumingTime += delta;
            if (this._consumingTime >= 10) {
                Player.instance.money += 5; // TODO Houses should pay once a month
                this._consumingTime = 0;

                var m = new Money(5);
                m.x = this.x + this.width / 2;
                m.y = this.y + this.height / 2;
                this.parent.addChild(m);
            }
        }
    };

    Object.defineProperties(House.prototype, {
        light: {
            get: function () {
                return this._light;
            },
            set: function (onoff) {
                if (onoff != this._light) {
                    if (this._current != null)
                        this.removeChild(this._current);

                    this._current = onoff ? this._onSprite : this._offSprite;
                    this.addChild(this._current);
                    this._light = onoff;
                }
            }
        }
    });

    return House;
});