define(["./Weapon", "../projectiles/Bullet", "jig/shapes/Quad"], function (Weapon, Bullet, Quad) {
    var Shotgun = function (container) {
        this._super([container]);
        // Graphics

        this.setProjectile(Bullet);
        this.setCooldown(1);
        this.setRateOfFire(5);
        this.setRandomSpread(4);

        var gun = new Quad(0x0000FF, 40, 3);
        this.addChild(gun);
    }
    extend(Shotgun, Weapon);

    return Shotgun;

});