define(['pixi/pixi'], function (PIXI) {
    return {
        Quad: extend(function (quadWidth, quadHeight, color, centered) {
            PIXI.Container.call(this);

            centered = centered || false;

            var graph = new PIXI.Graphics();
            graph.beginFill(color);
            graph.drawRect(0, 0, quadWidth, quadHeight);
            graph.endFill();

            if (centered) {
                graph.x = -quadWidth / 2;
                graph.y = -quadHeight / 2;
            }
            this.addChild(graph);
        }, PIXI.Container)
    }
});
