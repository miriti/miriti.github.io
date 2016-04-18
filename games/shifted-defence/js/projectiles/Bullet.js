define([
  "./Projectile",
  "jig/shapes/Quad",
  "jig/Audio"
], function(
  Projectile,
  Quad,
  Audio
) {
  var Bullet = function(weapon) {
    this._super([weapon]);

    this.speed = 300;
    this.hitRadius = 1;
    this.damage = 5;

    var bullet = new Quad(0xffffff, 2, 2);
    this.addChild(bullet);

  }
  extend(Bullet, Projectile);

  Bullet.prototype.shoot = function(aim) {
    Projectile.prototype.shoot.call(this, aim);
    
    Audio.play('snd_bullet');
  }

  return Bullet;

});
