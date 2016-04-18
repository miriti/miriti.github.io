define(["./Weapon", "../projectiles/Rocket", "jig/shapes/Quad"], function (Weapon, Rocket, Quad) {
    var Turret = function (container) {
        this._super([container]);
        // Graphics

        this.setProjectile(Rocket);
        this.setCooldown(0.5);

        var gun = new Quad(0xffee00, 45, 15);
        this.addChild(gun);
    }
    extend(Turret, Weapon);

    return Turret;

});