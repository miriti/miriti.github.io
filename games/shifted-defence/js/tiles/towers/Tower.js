define([
    'jig/Container',
    'jig/shapes/Circle',
    'jig/shapes/Quad',
    'jig/Vector',
    'jig/components/Schedule',
    '../Tile',
    '../Building',
    '../../components/Hitable',
    '../../weapons/Pistol'
  ],
  function(Container,
    Circle,
    Quad,
    Vector,
    Schedule,
    Tile,
    Building,
    Hitable,
    Pistol) {
    var Tower = function() {
      Building.call(this);

      this.addComponents([Hitable]);

      this.hitType = 'ally';
      this.hitRadius = Tile.SIZE / 2;

      this.build({
        bgLayer: {
          is: new Container()
        }
      });

      this.distance = 200;
      this.target = null;
      this.name = "Basic Tower";
      this.price = 100;

      this._weapon = this.weapon = null;
    };

    extend(Tower, Building);

    Object.defineProperties(Tower.prototype, {
      distance: {
        set: function(value) {
          this._distance = value;

          if (this.distanceField) {
            this.bgLayer.removeChild(this.distanceField);
          }

          this.distanceField = new Circle(0x00ff00, this._distance);
          this.distanceField.alpha = 0.2;
          this.distanceField.interactive = false;
          this.distanceField.visible = false;

          this.bgLayer.addChild(this.distanceField);
        },
        get: function() {
          return this._distance;
        }
      }
    });

    Tower.prototype.next = null;

    Tower.prototype.locateTarget = function() {
      for (var i in this.map.entities) {
        var entity = this.map.entities[i];

        var length = new Vector(this.x - entity.x, this.y - entity.y).length();

        if (length < this.distance) {
          this.target = entity;
          this.aimTo(entity);
          
          var clearTarget = (function() {
            this.target = null;
          }).bind(this);
          
          this.target.on('death', clearTarget);
          this.target.on('removed', clearTarget);
          return;
        }
      }
    };

    Tower.prototype.aimTo = function(target) {
      var rotation = new Vector(this.x, this.y).getAngleTo(target);

      if (this.weapon) {
        this.weapon.rotation = rotation;
      }

    }

    Tower.prototype.update = function(delta) {
      if (this.map) {
        if (this.target && this.target.health > 0) {
          this.aimTo(this.target);

          var v = new Vector(this.x - this.target.x, this.y - this.target.y);

          if (v.length() > this.distance) {
            this.target = null;
          }
        } else {
          this.locateTarget();
        }
      }

      if (this.weapon) {
        if (this.canShoot()) {
          this.shoot();
        }

        this.weapon.update(delta);
      }

    };

    Tower.prototype.shift = function() {
      if ((this.map) && (this.next)) {
        this.map.putTile(new this.next(), this.cell.x, this.cell.y, true);
      }
    };

    Tower.prototype.equipWeapon = function(weapon) {
      this.weapon = weapon;
      this.weapon.hitTypes = ['enemy'];

      this.addChild(weapon);
    }

    Tower.prototype.weaponBlueprint = function(weapon) {
      this._weapon = weapon;

    }

    Tower.prototype.canShoot = function() {

      if (this.target) {
        var position = new Vector(this.x, this.y);
        if (position.getDistanceTo(this.target) <= this.distance &&
          this.weapon.readyToShoot) {
          return true;
        }
      }

      return false;

    }

    Tower.prototype.shoot = function() {
      // var target = new Vector(this.target.x, this.target.y);
      this.weapon.shoot(this.target);


    }

    Tower.prototype.onBuild = function(map) {

      if (this._weapon) {
        this.equipWeapon(new this._weapon(map));
        this.weapon.pivot = this._weapon.pivot;
        this.weapon.position = new Vector(this._weapon.x, this._weapon.y);

      }
    }
    
    Tower.prototype.mouseover = function() {
      Building.prototype.mouseover.call(this);
      this.distanceField.visible = true;
    };
    
    Tower.prototype.mouseout = function() {
      this.distanceField.visible = false;
    };

    return Tower;
  });
