define(["./Weapon", "../projectiles/Bullet", "jig/shapes/Quad"], function (Weapon, Bullet, Quad) {
    var Machinegun = function (container) {
        this._super([container]);
        // Graphics

        this.setProjectile(Bullet);
        this.setCooldown(0.1);

        var gun = new Quad(0x0000FF, 40, 3);
        this.addChild(gun);
    }
    extend(Machinegun, Weapon);

    return Machinegun;

});