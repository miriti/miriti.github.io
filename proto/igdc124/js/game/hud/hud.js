define([
    'core/base',
    'pixi/pixi',
    'game/hud/button',
    'game/player'
], function (Base, PIXI, Button, Player) {
    var HUD = extend(function () {
        Base.GameObject.call(this);

        var moneyIndicator = new PIXI.Text('$0', {font: '32px monospace', fill: '#ff0'});
        //var inoutIndicator = new PIXI.Text('OUT: 0 / CON: 0', {font: '32px monospace', fill: '#0f0'});
        var timeIndicator = new PIXI.Text('00:00', {font:'32px monospace', fill: '#fff'});

        this.addChild(moneyIndicator);
        //this.addChild(inoutIndicator)
        this.addChild(timeIndicator);

        this.moneyIndicator = moneyIndicator;
        //this.inoutIndicator = inoutIndicator;
        this.timeIndicator = timeIndicator;

        this.resize(window.innerWidth, window.innerHeight);

        Player.subscribe('money', function(value) {
            moneyIndicator.text = '$' + value;
        });

        var zeroFill = function(n) {
            n = n.toString();
            if(n.length == 1) {
                return '0' + n;
            }

            return n;
        };

        Player.subscribe('time', function(value) {
            var totalMinutes = Math.floor(value);

            var hours = Math.floor(totalMinutes / 60);
            var mins = totalMinutes % 60;

            timeIndicator.text = zeroFill(hours) + ':' + zeroFill(mins);
        });
    }, Base.GameObject);

    HUD.prototype.resize = function(newScreenWidth, newScreenHeight) {
        this.moneyIndicator.x = Math.floor(-newScreenWidth/2 + 10);
        this.moneyIndicator.y = Math.floor(-newScreenHeight/2 + 10);

        //this.inoutIndicator.x = Math.floor(-this.inoutIndicator.width/2);
        //this.inoutIndicator.y = Math.floor(-newScreenHeight/2 + 10);

        this.timeIndicator.x = Math.floor(newScreenWidth/2 - this.timeIndicator.width - 10);
        this.timeIndicator.y = Math.floor(-newScreenHeight/2 + 10);
    }

    return HUD;
});
