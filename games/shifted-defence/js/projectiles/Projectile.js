define(["jig/Container", "jig/Vector"], function (Container, Vector) {

    var Projectile = function(weapon) {
        Container.call(this);
        
        this.weapon = weapon;
        
        this.speed = 1;
        this.damage = 1;
        this.blastRadius = 1;
        
        this.distanceTrafeled = 0;
        this.maxDistanceTrafeled = 500;
    }

    extend(Projectile, Container);
    
    Projectile.prototype._canHit = function(obj) {
      if(obj == this.start)
        return false;
      
      if(!obj['hitable'])
        return false;
      
      if(obj == this)
        return false;
      
      if(this.weapon.hitTypes.length == 0)
        return true;
      
      if(this.weapon.hitTypes.indexOf(obj.hitType) != -1)
        return true;
      
      return false;
    };
    
    Projectile.prototype.shoot = function(aim) {
      
      this.position.set(this.weapon.shooter.x, this.weapon.shooter.y);
      this.direction = new Vector(aim.x - this.x, aim.y - this.y).setLength(1);
      this.rotation = this.direction.atan2();
      
      this.weapon.projectileContainer.addChild(this);
    };

    Projectile.prototype.update = function(delta) {
        var itterations = 10;
        for(var itterate = 0; itterate <= itterations; itterate ++) {
            var step = this.speed / itterations;
            this.distanceTrafeled += Math.abs((this.direction.x * step + this.direction.y * step) * delta);

            this.x += this.direction.x * step * delta;
            this.y += this.direction.y * step * delta;

            for(var i in this.parent.children) {
              var obj = this.parent.children[i];
              
              if(this._canHit(obj)) {
                if(new Vector(this.x - obj.x, this.y - obj.y).length2() <= Math.pow(this.blastRadius + obj.hitRadius, 2)) {
                  obj.hit(this.damage);
                  this.ruin();
                  return;
                }
              }
            }
        }

        if(this.distanceTrafeled >= this.maxDistanceTrafeled) {
            this.ruin();

        }


    }

    Projectile.prototype.ruin = function() {
        // Play sound
        this.weapon.destroyProjectile(this);
        this.onHit.call(this, this.dest);

        this.destroy();

    }

    Projectile.prototype.onHit = function(collision) {


    }


    return Projectile;
});
