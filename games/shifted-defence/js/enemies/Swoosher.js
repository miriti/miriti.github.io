define([
    "./Enemy",
    "../weapons/Shotgun",
    'jig/shapes/Circle',
    'jig/Vector'
], function (
    Enemy,
    Shotgun,
    Circle,
    Vector
) {
    var Swoosher = function (container, x, y) {
        this._super([container, x, y]);

        this.build({
            body: {
                is: new Circle(0x55AA11, 25)
            }
        });

        this.hitRadius = 25/2;

        this.rangeOfFire = 250;
        this.speed = 75;

        this.setType('stalker');
        this.circleAroundRadius = 200;

        this.equipWeapon(new Shotgun(this.container));
        this.weapon.position = new Vector(5, 0);

        this.health = this.maxHealth = 100;
    }
    extend(Swoosher, Enemy);

    return Swoosher;

});
