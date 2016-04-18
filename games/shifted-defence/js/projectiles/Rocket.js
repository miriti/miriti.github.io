define([
    "./Projectile",
    "jig/shapes/Quad",
    "jig/Audio"
], function (
    Projectile,
    Quad,
    Audio
) {
    var Rocket = function (weapon) {
        this._super([weapon]);

        this.speed = 250;
        this.hitRadius = 25;
        this.damage = 50;

        var bullet = new Quad(0xffffff, 8, 8);
        this.addChild(bullet);

    }
    extend(Rocket, Projectile);
    
    Rocket.prototype.shoot = function(aim) {
      Projectile.prototype.shoot.call(this, aim);
      Audio.play("snd_bullet2");
    };


    return Rocket;

});
