define([
    "jig/Container",
    "jig/Vector",
    "../tiles/Tile",
    "../components/Hitable",
    "../components/Health",
    "../explosions/Explosion",
    "../ui/FloatText"
    ],
    function (
        Container,
        Vector,
        Tile,
        Hitable,
        Health,
        Explosion,
        FloatText
    ) {
    var Enemy = function (container, x, y) {
        Container.call(this);
        
        this.addComponents([Health, Hitable]);
        
        this.hitType = 'enemy';
        this.hitRadius = 10;
        this.distance = 10000;

        // Default circle property
        this.circleAroundRadius = 200;
        this.phase = 0;

        this.fase = 'findTarget';

        this.x = x * Tile.SIZE;
        this.y = y * Tile.SIZE;

        this.speed = 20;

        this.vx = 0;
        this.vy = 0;

        this.container = container;
        // this.rangeOfFire = 100;

        this.weapon = null;
        
        this.killPrice = 25;
    }
    extend(Enemy, Container);

    Enemy.prototype.moveTo = function(tile, delta) {
        var position = new Vector(this.x, this.y);

        var direction = position.getDirectionTo(tile);

        this.vx = direction.x;
        this.vy = direction.y;

        this.x += this.vx * this.speed * delta;
        this.y += this.vy * this.speed * delta;

    }

    Enemy.prototype.lookAt = function(tile) {
      if(this.body) {
        var position = new Vector(this.x, this.y);

        var rotation = position.getAngleTo(tile);
        this.body.rotation = rotation;
      }
    }

    Enemy.prototype.aimTo = function(target) {
        if(this.weapon) {
            var position = new Vector(this.x, this.y);

            var rotation = position.getAngleTo(target);
            this.weapon.rotation = rotation;
        }

    }

    Enemy.prototype.circleAround = function(delta) {

        this.aimTo(this.dest);
        if(this.canShoot()){
          this.shoot();
        };

        this.phase += delta;

        this.x = this.dest.x + Math.sin(this.phase) * this.circleAroundRadius;
        this.y = this.dest.y + Math.cos(this.phase) * this.circleAroundRadius;
    }

    Enemy.prototype.setGoal = function(dest) {
        this.dest = dest;
    }

    Enemy.prototype.crash = function (delta) {
        var position = new Vector(this.x, this.y);

        if(position.getDistanceTo(this.dest) <= (this.width / 2  + this.dest.width / 2)) {
            this.dest.hit(1);
            this.ruin();
        }

        if(this.dest) {
            this.moveTo(this.dest, delta);
            this.lookAt(this.dest);
            this.aimTo(this.dest);

        }

        if(this.canShoot()) {
            this.shoot();
        }

    }

    Enemy.prototype.moveToTarget = function(delta) {
        var position = new Vector(this.x, this.y);

        if(position.getDistanceTo(this.dest) <= 200) {
            return true;
        }

        this.moveTo(this.dest, delta);
        this.lookAt(this.dest);

    }

    Enemy.prototype.locateTarget = function() {

        if(this.dest) {
           return;

        }

        var closest = this.distance;
        var target = null;

        for (var i in this.container.buildings) {
            var entity = this.container.buildings[i];

            var length = new Vector(this.x - entity.x, this.y - entity.y).length();

            if (length < closest) {
                target = entity;
            }
        }

        if(target != null) {
            this.setGoal(target);
            this.aimTo(target);

            var clearTarget = (function() {
                this.dest = null;
            }).bind(this);

            this.dest.on('death', clearTarget);
            this.dest.on('removed', clearTarget);

            this.fase = 'moveToTarget';

        }

    };

    Enemy.prototype.setType = function(type) {
        this.type = type;

    }

    Enemy.prototype.update = function (delta) {
        this.locateTarget();


        switch (this.fase) {
            case 'crash':
                this.crash(delta);
                break;

            case 'circleAround':
                this.circleAround(delta);
                break;

            case 'shootFromDistance':
                this.lookAt(this.dest);
                this.aimTo(this.dest);

                if(this.canShoot()) {
                    this.shoot();
                }

                break;

            case 'moveToTarget':
                if(this.moveToTarget(delta)) {

                    switch(this.type) {
                        case 'terrorist' :
                            this.fase = 'crash';
                            break;
                        case 'stalker' :
                            this.fase = 'circleAround';
                            break;
                        case 'range' :
                            this.fase = 'shootFromDistance';
                            break;
                    }
                }

                break;

        }

    }

    Enemy.prototype.death = function() {
      this.parent.parent.money += this.killPrice;
      var money = new FloatText("+$" + this.killPrice, {font: "bold 60px monospace", fill: 0x00aa00});
      money.position.set(this.x, this.y);
      this.parent.addChild(money);
      
      this.ruin();
    }

    Enemy.prototype.ruin = function() {
        this.health = 0;

        if(this.parent) {
            this.parent.addChild(new Explosion(this, 100, 1));

            this.parent.entities.splice(this.parent.entities.indexOf(this), 1);
            this.parent.removeChild(this);
        }

    }

    Enemy.prototype.equipWeapon = function(weapon) {
        this.weapon = weapon;
        this.weapon.hitTypes = ['ally'];

        this.addChild(weapon);
    }

    Enemy.prototype.canShoot = function() {
        var position = new Vector(this.x, this.y);
        if(position.getDistanceTo(this.dest) <= this.rangeOfFire &&
            this.weapon.readyToShoot) {
            return true;
        }

        return false;

    }

    Enemy.prototype.shoot = function() {
        this.weapon.shoot(this.dest);


    }


    return Enemy;

});
