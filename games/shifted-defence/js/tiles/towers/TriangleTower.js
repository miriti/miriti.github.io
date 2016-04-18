define([
    'jig/shapes/Polygon',
    'jig/Vector',
    '../../weapons/Pistol',
    '../Tile',
    './Tower'
  ],
  function(Polygon,
    Vector,
    Pistol,
    Tile,
    Tower) {
    var TriangleTower = function() {
      Tower.call(this);
 
      this.name = "Triangle Tower";

      var size = (Tile.SIZE / 2) * 0.8;

      this.build({
        body: {
          is: new Polygon(0x00aaff, [0, -size, -size, size, size, size])
        }
      });


      this.weaponBlueprint(Pistol);
      this._weapon.pivot = new Vector(-5, 0);
      this._weapon.position = new Vector(0, 0);

      this.health = this.maxHealth = 100;
    };

    extend(TriangleTower, Tower);

    return TriangleTower;
  });
