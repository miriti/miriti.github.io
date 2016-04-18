define([
    'jig/shapes/Circle',
    'jig/Vector',
    '../../weapons/Turret',
    '../Tile',
    './Tower'
  ],
  function(Circle,
    Vector,
    Turret,
    Tile,
    Tower) {
    var CircleTower = function() {
      Tower.call(this);

      this.name = "Circle Tower";

      this.build({
        body: {
          is: new Circle(0xffaa00, (Tile.SIZE / 2) * 0.8)
        }
      });

      this.weaponBlueprint(Turret);
      this._weapon.pivot = new Vector(-45, 0);
      this._weapon.position = new Vector(0, 0);

      this.health = this.maxHealth = 100;
    };

    extend(CircleTower, Tower);

    return CircleTower;
  });
