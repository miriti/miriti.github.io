define([
        'pixi/pixi',
        'core/base'
    ], function (PIXI,
                 Base) {

        var Money = function (val) {
            Base.GameObject.call(this);

            this.interactive = false;

            var text = new PIXI.Text((val > 0 ? '+' : '-') + '$' + Math.abs(val), {
                font: "12px monospace",
                fill: val > 0 ? '#0f0' : '#f00'
            });
            text.anchor.set(0.5, 0.5);
            this.addChild(text);
        };

        extend(Money, Base.GameObject);

        Money.prototype.update = function (delta) {
            if (this.alpha < 0) {
                this.parent.removeChild(this);
            } else {
                Base.GameObject.prototype.update.call(this, delta);

                this.y -= 20 * delta;
                this.alpha -= 0.5 * delta;
            }
        };

        return Money;
    }
);