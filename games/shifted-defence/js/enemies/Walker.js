define([
    "./Enemy",
    "../weapons/Pistol",
    'jig/shapes/Quad',
    'jig/Vector'
], function (
    Enemy,
    Pistol,
    Quad,
    Vector
) {
    var Walker = function (container, x, y) {
        this._super([container, x, y]);

        this.build({
          body: {
            is: new Quad(0xff2222, 25, 25)
          }
        });

        this.type = 'range';

        this.rangeOfFire = 300;
        this.speed = 100;
        this.hitRadius = 25/2;

        this.equipWeapon(new Pistol(this.container));
        this.weapon.position = new Vector(15, 0);
        
        this.health = this.maxHealth = 100;
    }
    extend(Walker, Enemy);

    // Walker.prototype.update = function(delta) {
    //
    // }

    return Walker;

});
