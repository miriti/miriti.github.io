define(['pixi/pixi'], function (PIXI) {
    var Grid = function (cols, rows, cellSize, color) {
        PIXI.Container.call(this);

        var g = new PIXI.Graphics();
        g.beginFill(color);

        g.lineStyle(2, color);

        for (var i = 0; i <= cols; i++) {
            g.moveTo(i * cellSize, 0);
            g.lineTo(i * cellSize, rows * cellSize);
        }

        for (var j = 0; j <= rows; j++) {
            g.moveTo(0, j * cellSize);
            g.lineTo(cols * cellSize, j * cellSize);
        }

        g.endFill();

        this.addChild(g);
    };

    return extend(Grid, PIXI.Container);
});