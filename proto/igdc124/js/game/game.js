define([
    'pixi/pixi',
    'core/base',
    'core/shapes',
    'core/input',
    'game/map/map',
    'game/map/tiles',
    'game/map/town',
    'game/hud/hud',
    'game/player',
    'game/playerTools'
], function (PIXI,
             Base,
             shapes,
             Input,
             Map,
             Tiles,
             Town,
             HUD,
             Player,
             PlayerTools) {

    /**
     * Game
     *
     * @constructor
     */
    var Game = extend(function () {
        Base.GameObject.call(this);

        var map = new Map(10, 10);
        map.scale.set(3);
        map.init(7, 15);

        map.x = -map.width / 2;
        map.y = -map.height / 2;

        var town = new Town(2);
        town.putOnMap(map, 3, 3);
        
        var town2 = new Town(4);
        town2.putOnMap(map, 8, 3);

        this.addChild(map);
        this.map = map;

        this.addChild(new HUD());

        Player.instance.money = 5000;

        this.interactive = true;

        this.mousemove = function () {
            if (Player.instance.tool) {
                Player.instance.tool.move(this.map);
            }
        };

        Input.instance.setKeyListener(function (key) {
            if (key == Input.LEFT_ARROW) {
            }

            if (key == Input.RIGHT_ARROW) {
            }

            if (key == Input.DOWN_ARROW) {
            }

            if (key == Input.UP_ARROW) {
            }

            if (key == Input.B) {
                Player.instance.tool = PlayerTools.Build;
                console.log('Build->');
            }

            if (key == Input.M) {
                Player.instance.tool = PlayerTools.Move;
            }

            if (key == Input.D) {
                Player.instance.tool = PlayerTools.Demolition;
            }

            if (Player.instance.tool.name == 'build') {
                if (key == Input.W) {
                    Player.instance.tool.setTile(Tiles.Windgen);
                }

                if (key == Input.L) {
                    Player.instance.tool.setTile(Tiles.Wire);
                }

                if (key == Input.S) {
                    Player.instance.tool.setTile(Tiles.Switch);
                }
            }
        });

    }, Base.GameObject);

    Game.prototype.update = function (delta) {
        Player.instance.update(delta);
        Base.GameObject.prototype.update.call(this, delta);
    };

    return Game;
});
