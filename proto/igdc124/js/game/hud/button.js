define(['pixi/pixi', 'core/shapes'], function (PIXI, Shapes) {
    var Button = extend(function (text, callback) {
        PIXI.Container.call(this);

        this.text = new PIXI.Text(text, {font: "24px monospace", fill: "#fff"});
        this.text.anchor.set(0.5, 0.5);

        this.setText(text);

        this.addChild(this.text);

        this.callback = callback;

        this.interactive = true;
        this.buttonMode = true;

        var filters = [new PIXI.filters.DropShadowFilter()];

        this.mouseover = function () {
            this.filters = filters;
        };

        this.mouseout = function () {
            this.filters = null;
        };

        this.click = function () {

        }
    }, PIXI.Container);

    Button.prototype.setText = function (text) {

        this.text.text = text;

        if (this.bg) {
            this.removeChild(this.bg);
        }
        this.bg = new Shapes.Quad(this.text.width + 20, this.text.height + 15, 0x008800, true);

        this.addChild(this.bg);
    };

    return Button;
});