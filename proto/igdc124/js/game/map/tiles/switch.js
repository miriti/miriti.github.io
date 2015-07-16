define([
    'res',
    'game/map/tiles/connectible'
], function (res, Connectible) {
    /**
     * Switch
     */
    var Switch = function (variant) {
        Connectible.call(this);

        this.buildPrice = 25;
        this.resistance = 0.9;

        variant = variant || 'all';

        switch (variant) {
            case 'h-top':
                this.availableConnections = ['left', 'top', 'right'];
                break;
            case 'h-bottom':
                this.availableConnections = ['left', 'bottom', 'right'];
                break;
            case 'lt':
                this.availableConnections = ['left', 'top'];
                break;
        }

        var sprite = new PIXI.Sprite(res.getTexture('switch-' + variant));
        this.addChild(sprite);
    };

    extend(Switch, Connectible);

    return Switch;
});