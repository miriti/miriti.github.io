define([
    'jig/shapes/Quad',
    'jig/Vector',
    '../../weapons/Machinegun',
    '../Tile',
    './Tower'
  ],
  function(Quad,
    Vector,
    Machinegun,
    Tile,
    Tower) {
    var SquareTower = function() {
      Tower.call(this);

      this.name = "Square Tower";

      this.build({
        body: {
          is: new Quad(0x00ffaa, Tile.SIZE * 0.8, Tile.SIZE * 0.8)
        }
      });

      this.weaponBlueprint(Machinegun);
      this._weapon.pivot = new Vector(-45, 0);
      this._weapon.position = new Vector(0, 0);

      this.health = this.maxHealth = 100;
    };

    extend(SquareTower, Tower);

    return SquareTower;
  });
