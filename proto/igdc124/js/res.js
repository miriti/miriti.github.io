define(['pixi/pixi'], function (PIXI) {
    var loader = new PIXI.loaders.Loader('/data');
    loader.add('grass-tile', 'tiles/grass.png')
        .add('wire-h', 'tiles/wire-h.png')
        .add('wire-v', 'tiles/wire-v.png')
        .add('wire-tl', 'tiles/wire-tl.png')
        .add('wire-tr', 'tiles/wire-tr.png')
        .add('wire-br', 'tiles/wire-br.png')
        .add('wire-bl', 'tiles/wire-bl.png')
        .add('wire-dist', 'tiles/wire-dist.png')
        .add('switch-all', 'tiles/switch-all.png')
        .add('switch-h-top', 'tiles/switch-h-top.png')
        .add('switch-h-bottom', 'tiles/switch-h-bottom.png')
        .add('switch-lt', 'tiles/switch-lt.png')
        .add('windgen-base', 'tiles/windgen-base.png')
        .add('windgen-prop', 'tiles/windgen-prop.png')
        .add('house-on', 'tiles/house-on.png')
        .add('house-off', 'tiles/house-off.png')
        .add('forbidden', 'tiles/forbidden.png');

    return {
        loader: loader,
        r: loader.resources,
        getTexture: function (name) {
            return loader.resources[name].texture;
        }
    };
});
