define(["./Weapon", "../projectiles/Rocket", "jig/shapes/Quad"], function (Weapon, Rocket, Quad) {
    var RocketLauncher = function (container) {
        this._super([container]);
        // Graphics

        this.setProjectile(Rocket);
        this.setCooldown(5);

        var gun = new Quad(0xFFFF22, 30, 10);
        this.addChild(gun);
    }
    extend(RocketLauncher, Weapon);

    return RocketLauncher;

});